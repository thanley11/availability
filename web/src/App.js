import React, { Component } from 'react';
import AvailableTimes from './components/AvailableTimes';
import BookedTimes from './components/BookedTimes';
import NameInput from './components/NameInput';
import {fetchToday } from './utils/timeHelper';
import { getAvailableTimes, bookTime } from './utils/services';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availTimes : {},
      bookedTimes : {
        "541249": [
          {
            "instructor": 541249,
            "name": "asd",
            "time": "2019-08-21T19:30:00-04:00"
          },
          {
            "instructor": 541249,
            "name": "asd",
            "time": "2019-08-21T19:30:00-04:00"
          }
        ],
        "as": [
          {
            "instructor": 541249,
            "name": "asd",
            "time": "2019-08-21T19:30:00-04:00"
          },
          {
            "instructor": 541249,
            "name": "asd",
            "time": "2019-08-21T19:30:00-04:00"
          }
        ]
      },
      isLoading: true,
      today: null,
      name: ''
    };
    this.bookTime = this.bookTime.bind(this);
    this.setName = this.setName.bind(this);
  }

  async componentDidMount() {
    try {
      const today = fetchToday()
      this.setState({today: today});
      await this.getTimes();
    } catch(err) {

    }
  }

  async getTimes(){
    const response = await getAvailableTimes();
    const data = await response.json();
    let res = Object.keys(data).reduce(function (acc, curr) {
      return acc.concat(data[curr]);
    }, []);
    // let merged = res.reduce(function(acc, curr) {
    //   return Object.assign(acc, curr);
    // }, {});

    // let result = []
    let merged = res.reduce(function(acc, curr) {
      return Object.assign(acc, curr);
    }, {});
    let result = {}
    Object.keys(merged).forEach(x => {
      let key = merged[x]
      if (!result[key]) {
        result[key] = []
      }
      result[key].push(x);
    });

    // console.log(merged);
     this.setState({availTimes: result, isLoading: false})
  }


  async bookTime( time, instructor) {
    const name = await this.state.name;
    if(name){ 
      let response = await bookTime({name, time, instructor})
      const data = await response.json();
      console.log(data);
      this.setState({bookedTimes: data})
      // this.setState((prevState) => (
      //   Object.assign(
      //     {}, 
      //     this.state, 
      //     { bookedTimes: [...prevState.bookedTimes, response] }
      //   )
      // ));
      // let bookedTimes = this.state.bookedTimes
      // 
      // this.setState({ bookedTimes :booking});
    }
  }
  
  setName(name) {
    this.setState({name: name})
  }
    
  render() {
 
    return (
      <div className="App container">
        <h1>Book Time with an Advisor</h1>

        {this.state.today && <span id="today">Today is {this.state.today}.</span>}

        <NameInput nameCallback={this.setName}/>
        {this.state.isLoading ? <span id="loading">Loading...</span> : <AvailableTimes availTimes={this.state.availTimes} 
                                                                                       appCallback = {this.bookTime}/>}
        {this.state.isLoading ? <span id="loading">Loading...</span> : <BookedTimes bookedTimes={this.state.bookedTimes}/>}

      </div>
    );
    }
}

export default App;
