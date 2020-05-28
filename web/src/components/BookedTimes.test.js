import React from 'react';
import { shallow } from 'enzyme';
import BookedTimes from './BookedTimes';


describe("BookedTimes", ()=> {
  let bookedTimes;
  it('renders without crashing', ()=> {
    shallow(<BookedTimes bookedTimes={bookedTimes}/>);
  });
  it('should render a message if there are no booked times', () => {
    bookedTimes = {};
    const wrapper = shallow(<BookedTimes bookedTimes={bookedTimes} />);
     expect(wrapper.contains("No times have been booked")).toEqual(true);
  });
  it('should show booked times if they exist', () => {
    let bookedTimes = { 
        "123123": [
            {
                "instructor": 123123,
                "name": "Bob",
                "time": ""
            }
        ]
    };
    const wrapper = shallow(<BookedTimes bookedTimes={bookedTimes} />);

    expect(wrapper.find('.bookings').length).toEqual(1);
  });

});



