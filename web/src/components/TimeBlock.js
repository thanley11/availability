import React, { Component } from 'react';

class TimeBlock extends Component {
render() {

        const {times} = this.props;
        return (
            <ul className="list-unstyled">
            {
                times.map((time, index) => (
                    <li key={index}>
                    <time dateTime="time" className="book-time">{time}</time>
                    <button className="book btn-small btn-primary">Book</button>
                  </li>
                    ))
            }
            </ul>
           

    )
        }
}

export default TimeBlock;

