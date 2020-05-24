import React, { Component } from 'react'
import { formatTime} from '../utils/timeHelper';
class BookedTimes extends Component {
    flattenTimes(bookedTimes){
        let result = [];
        Object.keys(bookedTimes).map((x,i) => {
            result.push(bookedTimes[x])
        });
        return result;
    }
    render(){
        const {bookedTimes} = this.props;
        return (
            <div>
            <h2>Booked Times</h2>
            {bookedTimes ? (
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
        this.flattenTimes(bookedTimes).map((booking, index) => (
            <tr key={index}> 
                <td>{booking.instructor}</td>
                <td>{booking.name}</td>
                <td>{formatTime(booking.time)}</td>
            </tr>
            ))}
            </tbody>
        </table>
            ) : (
                <div> No times have been booked</div>
            )}
        </div>
        )
    }
}

export default BookedTimes;
