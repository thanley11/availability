import React, { Component } from 'react';
import { formatTime, sortTimesDateDesc} from '../utils/timeHelper';

class TimeBlock extends Component {
    constructor(props) {
        super(props);
        this.emitBooking = this.emitBooking.bind(this);
      }

    emitBooking = (time, instructor) => {
        this.props.parentCallback(time, instructor);
    }

render() {

        const {times, instructor} = this.props;
        return (
            <ul className="list-unstyled">
            {
                sortTimesDateDesc(times).map((time, index) => (
                    <li key={index}>
                        <span className="book-time">{formatTime(time)}</span>
                        <button onClick={() => this.emitBooking(time, instructor)}
                                className="book btn-small btn-primary">Book</button>
                    </li>
                    ))
            }
            </ul>  
    )
  }
}

export default TimeBlock;

