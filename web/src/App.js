import React, { Component } from 'react';
import AvailableTimes from './components/AvailableTimes';
import BookedTimes from './components/BookedTimes';
import NameInput from './components/NameInput';

const { format } = require('date-fns');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availTimes : {},
      isLoading: true,
      today: null
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
    console.log(data);
    let res = Object.keys(data).map(key => data[key])
                               .reduce((_,curr) => curr)
    const result =  Object.keys(res).reduce(function (acc, obj) {
              let key = res[obj]
              if (!acc[key]) {
                acc[key] = []
              }
              acc[key].push(obj)
              return acc
            }, {});
    this.setState({availTimes: result, isLoading: false})
    console.log(result);
  }

  fetchToday() {
     const date = new Date();
     const time = format(date, 'yyyy-MM-dd');
     this.setState({today: time});
  }

  render() {
    if (this.state.isLoading){

    }
    return (
      <div className="App container">
        <h1>Book Time with an Advisor</h1>

        {this.state.today && <span id="today">Today is {this.state.today}.</span>}

        <NameInput/>
        {this.state.isLoading ? <span id="loadingv">Loading...</span> : <AvailableTimes availTimes={this.state.availTimes}/>}
        <BookedTimes/>
      </div>
    );
  }
}

export default App;
