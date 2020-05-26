import { getAvailableTimes, bookingTimes, bookTime } from "../utils/services";
import { convertTimeData } from '../utils/timeHelper';
import { getBookingTimes, getAvailTimesSuccess, hasError, getBookingTimesSuccess, toggleShowMsg} from './actions';

export function getAvailableTimesThunk() {
    return function(dispatch) {
      dispatch(getAvailableTimes);
      return getAvailableTimes()
      .then((result) => result.json())
      .then((data) => convertTimeData(data))
      .then(
        (result) => dispatch(getAvailTimesSuccess(result)),
        () => dispatch(hasError())
      );
    };
  }

export function getBookingTimesThunk() {
    return function(dispatch) {
      dispatch(getBookingTimes);
      return bookingTimes()
      .then((result) => result.json())
      .then(
        (result) => dispatch(getBookingTimesSuccess(result)),
        () => dispatch(hasError())
      );
    };
  }

  export function bookTimeThunk(name, time, instructor) {
    return function (dispatch, getState) {
        dispatch(getBookingTimes);
        return bookTime({name, time, instructor})
        .then((result) => result.json())
        .then((data) => {
            const removeTime = getState().availTimes[instructor].filter(x => x !== time)
            const exceptTimes = {
                ...getState().availTimes,
                [instructor]: removeTime
            } 
            return {data,exceptTimes}
        })
        .then(({data, exceptTimes}) =>
            Promise.all([
                dispatch(getBookingTimesSuccess(data)),
                dispatch(getAvailTimesSuccess(exceptTimes)),
                dispatch(showMsg())
              ]),
            () => dispatch(hasError())
        ); 
    }
}

function showMsg() {
    return dispatch => {
      dispatch(toggleShowMsg())
      setTimeout(() => {
        dispatch(toggleShowMsg());
      }, 3000)
    };
  }


