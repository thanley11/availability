import React, { Component } from 'react';
import AvailableTimes from './components/AvailableTimes';
import BookedTimes from './components/BookedTimes';
import NameInput from './components/NameInput';

const { format } = require('date-fns');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availTimes : {}
    };
  }

  async componentDidMount() {
    try {
      this.fetchToday();
      await this.getTimes();
    } catch(err) {

    }
  }

  async getTimes(){
    const url ="api/advisors/availability";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({availTimes: data})
    console.log(data);
  }

  fetchToday() {
     const date = new Date();
     const time = format(date, 'yyyy-MM-dd');
     this.setState({today: time});
  }
   
  render() {
    return (
      <div className="App container">
        <h1>Book Time with an Advisor</h1>

        {this.state.today && <span id="today">Today is {this.state.today}.</span>}

        <NameInput/> 
        <AvailableTimes/>
        <BookedTimes/>
      </div>
    );
  }
}

export default App;
