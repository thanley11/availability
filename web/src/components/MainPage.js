import React , {useEffect } from 'react';
import AvailableTimes from './AvailableTimes';
import BookedTimes from './BookedTimes';
import NameInput from './NameInput';
import { fetchToday } from '../utils/timeHelper';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingTimesThunk, getAvailableTimesThunk, bookTimeThunk } from '../store/effects';
import { showInputErrorAction } from '../store/actions';

export default function MainPage(){

    function bookTime(time, instructor){
        if(name){
            dispatch(bookTimeThunk(name, time, instructor))
        } else {
            window.scrollTo(0, scrollRef.current.offsetTop);
            dispatch(showInputErrorAction());
        }
       
    }
    const today = fetchToday();
    
    const showInputError = useSelector(state => state.showInputError);
    const showMsg = useSelector(state => state.showMsg);
    const availTimes = useSelector(state => state.availTimes);
    const bookedTimes = useSelector(state => state.bookedTimes);
    const isAvailLoading = useSelector(state => state.isAvailLoading);
    const isBookedLoading = useSelector(state => state.isBookedLoading);
    const name = useSelector(state => state.name);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBookingTimesThunk());
        dispatch(getAvailableTimesThunk());
    }, [dispatch])
    
    const scrollRef = React.useRef(null);

    return (
        <div className="App container">
        <h1>Book Time with an Advisor</h1>

        {today && <span id="today">Today is {today}.</span>}

        <div ref={scrollRef}><NameInput  showInputError={showInputError}/>
        </div>
        {isAvailLoading ? <span id="loading">Loading available times...</span> : 
        <div> 
            <AvailableTimes availTimes={availTimes}  bookTimeCallback={bookTime}/>
        </div>
        }
        {isBookedLoading ? <span id="loading">Loading booked times...</span> : 
        <div> 
            <BookedTimes bookedTimes={bookedTimes} />
        </div>}

        {showMsg ? <div className="alert alert-info bottom-right">Booking Added</div> : null}

      </div>
    )
}