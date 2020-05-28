import { getAvailableTimes, bookingTimes, bookTime } from "../utils/services";
import { convertTimeData } from '../utils/timeHelper';
import { getBookingTimes, getAvailTimesAction, getAvailTimesSuccess, hasError, getBookingTimesSuccess, toggleShowMsg} from './actions';

export function getAvailableTimesThunk() {
    return function(dispatch, getState) {
      dispatch(getAvailTimesAction());
      return getAvailableTimes()
      .then((result) => result.json())
      .then((data) => convertTimeData(data, getState().bookedTimes))
      .then(
        (result) => dispatch(getAvailTimesSuccess(result)),
        () => dispatch(hasError())
      );
    };
  }

export function getBookingTimesThunk() {
    return function(dispatch) {
      dispatch(getBookingTimes());
      return bookingTimes()
      .then((result) => result.json())
      .then(
        (result) => {
            return Promise.all([
                dispatch(getBookingTimesSuccess(result)),
                dispatch(getAvailableTimesThunk())
              ]),
            () => dispatch(hasError())
        },
        () => dispatch(hasError())
      );
    };
  }

  export function bookTimeThunk(name, time, instructor) {
    return function (dispatch, getState) {
        return bookTime({name, time, instructor})
        .then((result) => result.json())
        .then((data) => {
            const current = getState().availTimes;
            if(current[instructor]){
                const filtered = current[instructor].filter(x => x !== time)
                const exceptTimes = {
                    ...current,
                    [instructor]: filtered
                } 
                return {data,exceptTimes}
            }
            return {data} 
        })
        .then(({data, exceptTimes = null}) =>{
            if(exceptTimes){
                return Promise.all([
                    dispatch(getBookingTimesSuccess(data)),
                    dispatch(getAvailTimesSuccess(exceptTimes)),
                    dispatch(showMsg())
                  ]),
                () => dispatch(hasError())
            }else {
                return Promise.all([
                    dispatch(getBookingTimesSuccess(data)),
                    dispatch(showMsg())
                  ]),
                () => dispatch(hasError()) 
            }
           
        }
           
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


