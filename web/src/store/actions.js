export const GET_BOOKINGS = "GET_BOOKINGS"
export const GET_BOOKINGS_SUCCESS = "GET_BOOKINGS_SUCCESS"
export const GET_AVAIL_TIMES = "GET_AVAIL_TIMES"
export const GET_AVAIL_TIMES_SUCCESS = "GET_AVAIL_TIMES_SUCCESS"
export const SET_NAME = "SET_NAME"
export const TOGGLE_MSG = "TOGGLE_MSG"
export const HTTP_ERROR = "HTTP_ERROR"
export const INPUT_ERROR = "INPUT_ERROR"

export function getBookingTimes(){
    return {
        type: GET_BOOKINGS,
    }
}

export function getBookingTimesSuccess(bookings){
    return {
        type: GET_BOOKINGS_SUCCESS,
        payload: bookings
    }
}

export function getAvailTimesAction(){
    return {
        type: GET_AVAIL_TIMES
    }
}

export function getAvailTimesSuccess(times){
    return {
        type: GET_AVAIL_TIMES_SUCCESS,
        payload: times
    }
}
  
export function setName(name) {
    return {
        type: SET_NAME,
        payload: name
    }
  }

  export function toggleShowMsg() {
    return {
        type: TOGGLE_MSG
    }
  }

  export function showInputErrorAction() {
    return {
        type: INPUT_ERROR
    }
  }


  export function hasError() {
    return {
        type: HTTP_ERROR
    }
  }