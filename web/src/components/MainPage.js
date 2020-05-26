import React , {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AvailableTimes from './AvailableTimes';
import BookedTimes from './BookedTimes';
import NameInput from './NameInput';
import { fetchToday, convertTimeData } from '../utils/timeHelper';
import { getAvailableTimes, getBookingTimes } from '../utils/services';

export default function MainPage(){
    const showMsg = useSelector((state) => state.showMsg);
    const showError = useSelector((state) => state.showError);
    const today = fetchToday();
    const [availTimes, setAvailTimes] = useState({});
    const [bookedTimes, setBookedTimes] = useState({});
    const [isAvailLoading, setAvailLoading] = useState(true)
    const [isBookedLoading, setBookedLoading] = useState(true)
    useEffect(() => {
        async function getAvailTimes(){

            const response = await getAvailableTimes();
            const data = await response.json();
            const result = convertTimeData(data);
            setAvailTimes(result);
            setAvailLoading(false);
          }
          getAvailTimes();
    }, []);
    useEffect(() =>{
        async function getTimes(){

            const response = await getBookingTimes();
            const data = await response.json();
            setBookedTimes(data);
            setBookedLoading(false);
          }
          getTimes();
    }, []);
 
    // useEffect(getAvailTimesEffect, []).then(data => dispatch(getAvailTimesSuccess(data)));
    // useEffect(getBookTimesEffect, []).then(data => dispatch(getBookingTimesSuccess(data)));

    // const scrollRef = React.useRef();

    return (
        <div className="App container">
        <h1>Book Time with an Advisor</h1>

        {today && <span id="today">Today is {today}.</span>}

        {/* <NameInput nameCallback={this.setName} ref={scrollRef} showError={showError}/> */}
        <NameInput  showError={showError}/>

        {isAvailLoading ? <span id="loading">Loading...</span> : 
        <div> 
          <AvailableTimes availTimes={availTimes}/>
         
        </div>}
        {isBookedLoading ? <span id="loading">Loading...</span> : 
        <div> 
                <BookedTimes bookedTimes={bookedTimes} />
         
        </div>}

        {showMsg ? <div className="alert alert-info bottom-right">Booking Added</div> : null}

      </div>
    )
}