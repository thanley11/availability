import React, { Component } from 'react';
import AvailableTimes from './components/AvailableTimes';
import BookedTimes from './components/BookedTimes';
import NameInput from './components/NameInput';
import {fetchToday } from './utils/timeHelper';
import { getAvailableTimes, bookTime, getBookingTimes } from './utils/services';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availTimes : {},
      bookedTimes : {},
      isLoading: true,
      today: null,
      name: '',
      showError: false,
      showMsg: false
    };
    this.bookTime = this.bookTime.bind(this);
    this.setName = this.setName.bind(this);
    this.scrollRef = React.createRef();
  }

  async componentDidMount() {
    try {
      const today = fetchToday()
      this.setState({today: today});
      await this.getBookTimes();
      await this.getAvailTimes();
      this.setState({isLoading: false}) 
    } catch(err) {

    }
  }

  async getAvailTimes(){
    const response = await getAvailableTimes();
    const data = await response.json();
    const result = this.convertTimeData(data);
    this.setState({availTimes: result})
  }

  async getBookTimes(){
    const response = await getBookingTimes();
    const data = await response.json();
    this.setState({bookedTimes: data})
    return data;
  }

  async bookTime(time, instructor) {
    const name = this.state.name;
    if(name){ 
      let response = await bookTime({name, time, instructor})
      const data = await response.json();
      const removeTime = this.state.availTimes[instructor].filter(x => x !== time)
      const exceptTimes = {
        ...this.state.availTimes,
        [instructor]: removeTime
      }
      this.setState({bookedTimes: data, availTimes: exceptTimes});
      this.showMsg();
    } else {
      window.scrollTo(0, this.scrollRef.current.offsetTop);
      this.setState({showError: true}) 
    }
  }

  convertTimeData(data){
    let res = Object.keys(data).reduce(function (acc, curr) {
      return acc.concat(data[curr]);
    }, []);

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
    return result;
  }

  showMsg(){
    this.setState({
      showMsg:true
    });
    setTimeout(() => {
      this.setState({
        showMsg:false
      }); 
    }, 3000)
  }
  
  setName(name) {
    if(name){
      this.setState({name: name, showError:false})
    }
  }
    
  render() {
 
    return (
      <div className="App container">
        <h1>Book Time with an Advisor</h1>

        {this.state.today && <span id="today">Today is {this.state.today}.</span>}

        <NameInput nameCallback={this.setName} ref={this.scrollRef} showError={this.state.showError}/>
        {this.state.isLoading ? <span id="loading">Loading...</span> : 
        <div> 
          <AvailableTimes availTimes={this.state.availTimes} 
                              appCallback = {this.bookTime}/>
          <BookedTimes bookedTimes={this.state.bookedTimes}/>
        </div>}
        {this.state.showMsg ? <div className="alert alert-info bottom-right">Booking Added</div> : null}

      </div>
    );
    }
}

export default App;
