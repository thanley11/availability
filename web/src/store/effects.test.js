
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from "./actions";
import * as effects from "./effects";
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let init;

describe('async actions', () => {
  beforeEach(()=>{
       init = {
        availTimes : {},
        bookedTimes : {},
        isAvailLoading: false,
        isBookedLoading: false,
        name: '',
        showInputError: false,
        showError: false,
        showMsg: false
      }
  })
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
        { type: actions.GET_AVAIL_TIMES},
        { type: actions.GET_AVAIL_TIMES_SUCCESS, payload: result}
    ]
    
    const store = mockStore(init);

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
        { type: actions.GET_BOOKINGS},
        { type: actions.GET_BOOKINGS_SUCCESS, payload: payload}
    ]
    
    const store = mockStore(init);

    return store.dispatch(effects.getBookingTimesThunk()).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })


it('bookTimeThunk creates getBookingTimesSuccess and showMsg if no previous availTimes', () => {
  
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
        { type: actions.TOGGLE_MSG}
    ]
    
    const store = mockStore(init);

    return store.dispatch(effects.bookTimeThunk(name, time, instructor)).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })
  it('bookTimeThunk creates getBookingTimesSuccess and getAvailTimesSuccess and showMsg ', () => {

    const name = "Bob";
    const instructor =123123;
    const time =  "2019-08-27T14:00:00-04:00"
    const payload = { 
        "123123": [
            {
                "instructor": instructor,
                "name": name,
                "time": time
            }
        ]
    };
    fetchMock.mock('*', {
      body: payload,
      headers: { 'content-type': 'application/json' }
    })
    const expectedAction = [ 
        { type: actions.GET_BOOKINGS_SUCCESS, payload: payload},
        { type: actions.GET_AVAIL_TIMES_SUCCESS, payload: payload},
        { type: actions.TOGGLE_MSG},
    ]
    const advState = {...init, availTimes:payload};
    const store = mockStore(advState);

    return store.dispatch(effects.bookTimeThunk(name, time, instructor)).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })
})