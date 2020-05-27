
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from "./actions";
import * as effects from "./effects";
// import * as types from '../../constants/ActionTypes'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
// jest.mock('redux-thunk', () => ({
//   getState: jest.fn(() => {}),
// }))
describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('getAvailableTimesThunk creates getAvailTimesSuccess', () => {
    const result = { "372955": [
        "2019-08-27T14:00:00-04:00"]};
    const payload = {"2019-08-27": {"2019-08-27T14:00:00-04:00": 372955}}
    fetchMock.mock('*', {
      body: payload ,
      headers: { 'content-type': 'application/json' }
    })
    const expectedAction = [
        { type: actions.GET_AVAIL_TIMES_SUCCESS, payload: result}
    ]
    
    const store = mockStore({});

    return store.dispatch(effects.getAvailableTimesThunk()).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('getBookingTimesThunk creates getBookingTimesSuccess', () => {
    const name = "Bob";
    const instructor =123123;
    const time =  "2019-08-27T14:00:00-04:00"
    const payload = [{ 
        "123123": [
            {
                "instructor": instructor,
                "name": name,
                "time": time
            }
        ]
    }];
    fetchMock.mock('*', {
      body: payload,
      headers: { 'content-type': 'application/json' }
    })
    const expectedAction = [
        { type: actions.GET_BOOKINGS_SUCCESS, payload: payload}
    ]
    
    const store = mockStore({});

    return store.dispatch(effects.getBookingTimesThunk()).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })


it('bookTimeThunk creates getBookingTimesSuccess and getAvailTimesSuccess and showMsg ', () => {
    const init = {
        availTimes : {},
        bookedTimes : {},
        isAvailLoading: false,
        isBookedLoading: false,
        name: '',
        showInputError: false,
        showError: false,
        showMsg: false
      }
    const name = "Bob";
    const instructor =123123;
    const time =  "2019-08-27T14:00:00-04:00"
    const payload = [{ 
        "123123": [
            {
                "instructor": instructor,
                "name": name,
                "time": time
            }
        ]
    }];
    fetchMock.mock('*', {
      body: payload,
      headers: { 'content-type': 'application/json' }
    })
    const expectedAction = [ 
        { type: actions.GET_BOOKINGS_SUCCESS, payload: payload},
        { type: actions.GET_AVAIL_TIMES_SUCCESS, payload: payload},
        { type: actions.TOGGLE_MSG},
    ]
    
    const store = mockStore(init);

    return store.dispatch(effects.bookTimeThunk(name, time, instructor)).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })
})


// describe("getAvailableTimesThunk", () => {
//     it("gets getAvailableTimes and return getAvailTimesSuccess", async () => {
//       const store = mockStore();
//       await store.dispatch(getBookingTimes);
//       const actions = store.getActions();
//       expect(actions[0]).toEqual({type: "CHANGE_PURCHASE_STATE_STARTED"});
//       expect(actions[1]).toEqual({type: "CHANGE_PURCHASE_STATE_SUCCESS", payload: { id: "rylauNS2GG", status: "sent" }});
//       expect(actions[2]).toEqual({type: "FETCH_ALL_PURCHASES_STARTED"});
//     });
//   });

//   describe("bookTimeThunk", () => {
//     it("books a time and returns getBookingTimesSuccess, getAvailTimesSuccess and shows a message", async () => {
//       const store = mockStore();
//       await store.dispatch(changePurchaseStatus("rylauNS2GG", "sent"));
//       const actions = store.getActions();
//       expect(actions[0]).toEqual({type: "CHANGE_PURCHASE_STATE_STARTED"});
//       expect(actions[1]).toEqual({type: "CHANGE_PURCHASE_STATE_SUCCESS", meta: { id: "rylauNS2GG", status: "sent" }});
//       expect(actions[2]).toEqual({type: "FETCH_ALL_PURCHASES_STARTED"});
//     });
//   });

//   describe("getBookingTimesThunk", () => {
//     it("gets bookingTimes and return getBookingTimesSuccess", async () => {
//       const store = mockStore();
//       await store.dispatch(changePurchaseStatus("rylauNS2GG", "sent"));
//       const actions = store.getActions();
//       expect(actions[0]).toEqual({type: "CHANGE_PURCHASE_STATE_STARTED"});
//       expect(actions[1]).toEqual({type: "CHANGE_PURCHASE_STATE_SUCCESS", meta: { id: "rylauNS2GG", status: "sent" }});
//       expect(actions[2]).toEqual({type: "FETCH_ALL_PURCHASES_STARTED"});
//     });
//   });