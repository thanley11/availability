import React from 'react';
import { Provider } from 'react-redux'
import store from './store/store';
// import {fetchToday } from './utils/timeHelper';
// import { getAvailableTimes, bookTime, getBookingTimes } from './utils/services';
import MainPage from './components/MainPage';

// class App extends Component {
//   constructor(props) {
//     super(props);
    // this.state = {
    //   availTimes : {},
    //   bookedTimes : {},
    //   isLoading: true,
    //   today: null,
    //   name: '',
    //   showError: false,
    //   showMsg: false
    // };
    // this.bookTime = this.bookTime.bind(this);
    // this.setName = this.setName.bind(this);
  // }

  // async componentDidMount() {
  //   try {
  //     const today = fetchToday()
  //     this.setState({today: today});
  //     await this.getBookTimes();
  //     await this.getAvailTimes();
  //     this.setState({isLoading: false}) 
  //   } catch(err) {

  //   }
  // }

  // async getAvailTimes(){
  //   const response = await getAvailableTimes();
  //   const data = await response.json();
  //   const result = this.convertTimeData(data);
  //   this.setState({availTimes: result})
  // }

  // async getBookTimes(){
  //   const response = await getBookingTimes();
  //   const data = await response.json();
  //   this.setState({bookedTimes: data})
  //   return data;
  // }

  // async bookTime(time, instructor) {
  //   const name = this.state.name;
  //   if(name){ 
  //     let response = await bookTime({name, time, instructor})
  //     const data = await response.json();
  //     const removeTime = this.state.availTimes[instructor].filter(x => x !== time)
  //     const exceptTimes = {
  //       ...this.state.availTimes,
  //       [instructor]: removeTime
  //     }
  //     this.setState({bookedTimes: data, availTimes: exceptTimes});
  //     this.showMsg();
  //   } else {
  //     window.scrollTo(0, this.scrollRef.current.offsetTop);
  //     this.setState({showError: true}) 
  //   }
  // }


  

    
  // render() {
 
  //   return (
  //     <Provider store={store}>
  //       <MainPage />
  //     </Provider>
  //   );
  //   }
// }


function App() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

export default App;

