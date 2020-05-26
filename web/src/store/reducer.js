import { SET_NAME, GET_AVAIL_TIMES, TOGGLE_MSG, GET_BOOKINGS, HTTP_ERROR, INPUT_ERROR, GET_BOOKINGS_SUCCESS, GET_AVAIL_TIMES_SUCCESS } from './actions';

const initState = {
    availTimes : {},
    bookedTimes : {},
    isAvailLoading: false,
    isBookedLoading: false,
    today: null,
    name: '',
    showInputError: false,
    showError: false,
    showMsg: false
  };

export default function bookingReducer(state, action) {
    if (typeof state === 'undefined') {
        return initState
    }

    switch(action.type){
        case SET_NAME:
            return {
                ...state,
                name: action.payload,
                showInputError: false
            }
        case GET_AVAIL_TIMES:
            return {
                ...state,
                isAvailLoading: true
            }
        case GET_BOOKINGS:
            return {
                ...state,
                isBookedLoading: true
            }
        case GET_BOOKINGS_SUCCESS:
            return {
                ...state,
                bookedTimes: action.payload,
                isBookedLoading: false
            }
        case GET_AVAIL_TIMES_SUCCESS:
            return {
                ...state,
                availTimes: action.payload,
                isAvailLoading: false
            } 
        case HTTP_ERROR:
            return {
                ...state,
                showError: true
            }
         case INPUT_ERROR:
            return {
                ...state,
                showInputError: true
            }
        case TOGGLE_MSG:
            return{
                ...state,
                showMsg: !state.showMsg
            }
        default:
            return state;
    }
}