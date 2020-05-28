import React from 'react';
import TimeBlock from './TimeBlock';
import { useSelector } from 'react-redux';

export default function AvailableTimes(props) {
    function callbackFunction(time, instructor) {
        props.bookTimeCallback(time, instructor)
    }
    const availTimes = useSelector((state) => state.availTimes);

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
                 Object.keys(availTimes).map((key, index) => {
                    if(availTimes[key].length > 0){
                       return <tr key={index}> 
                            <td>{key}</td>
                            <td>
                              <TimeBlock emitCallback = {callbackFunction} 
                                         instructor={key}
                                         times={availTimes[key]} />
                            </td>
                        </tr>
                    } else {
                        return null
                    }
                })
              }
            
          </tbody>
        </table>
        </div>
    )
}

