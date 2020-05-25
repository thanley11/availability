import React, { Component } from 'react';
import TimeBlock from './TimeBlock';

class AvailableTimes extends Component {
    constructor(props) {
        super(props);
        this.callbackFunction = this.callbackFunction.bind(this);
      }

    callbackFunction = (time, instructor) => {
        this.props.appCallback(time, instructor)
    }
render() {

        const {availTimes} = this.props;
        return (
        <div>
        <h2>Available Times</h2>
        <table className="advisors table">
          <thead>
            <tr>
              <th>Advisor ID</th>
              <th>Available Times</th>
            </tr>
          </thead>
          <tbody>
            {
        Object.keys(availTimes).map((key, index) => (
          <tr key={index}> 
              <td>{key}</td>
              <td>
                <TimeBlock parentCallback = {this.callbackFunction}
                           instructor={key}
                           times={availTimes[key]} />
              </td>
          </tr>
            ))}
          </tbody>
        </table>

        </div>
    )
        }
}

export default AvailableTimes;
