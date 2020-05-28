import React from 'react';
import { shallow } from 'enzyme';
import AvailableTimes from './AvailableTimes';
import * as redux from 'react-redux';
import TimeBlock from './TimeBlock';

describe("AvailableTimes", ()=> {
  let availTimes = { 
    123123: [
        "2019-08-24T10:30:00-04:00"
    ]
  };
  const selectorSpy = jest.spyOn(redux, 'useSelector')
  selectorSpy.mockReturnValue(availTimes);

  it('renders without crashing', ()=> {
    shallow(<AvailableTimes availTimes={availTimes}/>);
  });

  it('should show available times if they exist', () => {

    const wrapper = shallow(<AvailableTimes availTimes={availTimes} />);
    expect(wrapper.find('.advisors').length).toEqual(1);
    expect(wrapper.find(TimeBlock)).toHaveLength(1);
  });

});



