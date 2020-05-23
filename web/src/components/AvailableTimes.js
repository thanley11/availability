/*import React, { Component } from 'react';*/

//class AvailableTimes extends Component {
//render() {

//const {availTimes} = this.props;  // Essentially does: const vals = this.state.vals;
  //return (
    //<div>
      //{
        //Object.keys(availTimes).map((key, index) => (
          //<p key={index}> this is my key {key} and this is my value {availTimes[key]}</p>
        //))
      //}
    //</div>
  //)
//}
      //}

/*export default AvailableTimes;*/
import React, { Component } from 'react';
import TimeBlock from './TimeBlock';

class AvailableTimes extends Component {
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
                <TimeBlock times={availTimes[key]}/>
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
