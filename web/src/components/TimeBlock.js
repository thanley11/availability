import React from 'react';
import { formatTime, sortTimesDateAsc} from '../utils/timeHelper';

export default function TimeBlock(props) {
    function emitBooking (time, instructor) {
        props.emitCallback(time, instructor);

    }
    const {times, instructor} = props;
        return (
            <ul className="list-unstyled">
            {
                sortTimesDateAsc(times).map((time, index) => (
                    <li key={index}>
                        <span className="book-time">{formatTime(time)}</span>
                        <button onClick={() => emitBooking(time, instructor)}
                                className="book btn-small btn-primary">Book</button>
                    </li>
                    ))
            }
            </ul>  
    )
}