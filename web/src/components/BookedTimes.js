import React from 'react';
import { formatTime} from '../utils/timeHelper';
import { flattenTimes } from '../utils/timeHelper';

export default function BookedTimes(props) {
    const {bookedTimes} = props;
    return (
        <div>
        <h2>Booked Times</h2>
        {bookedTimes && Object.keys(bookedTimes).length ? (
        <table className="bookings table">
        <thead>
        <tr>
            <th>Advisor ID</th>
            <th>Student Name</th>
            <th>Date/Time</th>
        </tr>
        </thead>
        <tbody>
        {
    flattenTimes(bookedTimes).map((booking, index) => (
        <tr key={index}> 
            <td>{booking.instructor}</td>
            <td>{booking.name}</td>
            <td>{formatTime(booking.time)}</td>
        </tr>
        ))}
        </tbody>
    </table>
        ) : (
            <div>No times have been booked</div>
        )}
    </div>
    )
}