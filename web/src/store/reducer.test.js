import bookingReducer from './reducer';
import * as types from './actions'

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
describe('bookingReducer', () => {

  it('should return the initial state', () => {
    expect(bookingReducer(undefined, {})).toEqual(
      init
    )
  })

  it('should handle SET_NAME', () => {
    expect(
        bookingReducer({}, {
        type: types.SET_NAME,
        payload: 'name'
      })
    ).toEqual(
      {
        name: 'name',
        showInputError: false
      }
    )
    });
  it('should handle GET_AVAIL_TIMES', () => {
    expect(
        bookingReducer(
        {},
        {
          type: types.GET_AVAIL_TIMES
        }
      )
    ).toEqual(
      {
        isAvailLoading: true
      }
    )
  });
  it('should handle GET_BOOKINGS', () => {
    expect(
        bookingReducer(
        {},
        {
          type: types.GET_BOOKINGS
        }
      )
    ).toEqual(
      {
        isBookedLoading: true
      }
    )
  });

  it('should handle GET_BOOKINGS_SUCCESS', () => {
    expect(
        bookingReducer(
        {},
        {
          type: types.GET_BOOKINGS_SUCCESS,
          payload: {}
        }
      )
    ).toEqual(
      {
        bookedTimes: {},
        isBookedLoading: false
      }
    )
  });

  it('should handle GET_AVAIL_TIMES_SUCCESS', () => {
    expect(
        bookingReducer(
        {},
        {
          type: types.GET_AVAIL_TIMES_SUCCESS,
          payload: {}
        }
      )
    ).toEqual(
      {
        availTimes: {},
        isAvailLoading: false
      }
    )
  });

  it('should handle HTTP_ERROR', () => {
    expect(
        bookingReducer(
        {},
        {
          type: types.HTTP_ERROR
        }
      )
    ).toEqual(
      {
        showError: true
      }
    )
  });

  it('should handle INPUT_ERROR', () => {
    expect(
        bookingReducer(
        {},
        {
          type: types.INPUT_ERROR
        }
      )
    ).toEqual(
      {
        showInputError: true
      }
    )
  });

  it('should handle TOGGLE_MSG', () => {
    expect(
        bookingReducer(
        {},
        {
          type: types.TOGGLE_MSG
        }
      )
    ).toEqual(
      {
        showMsg: true
      }
    )
    expect(
        bookingReducer(
        {showMsg:true},
        {
          type: types.TOGGLE_MSG
        }
      )
    ).toEqual(
      {
        showMsg: false
      }
    )
  });
})