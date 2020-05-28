import React from 'react';
import { shallow } from 'enzyme';
import TimeBlock from './TimeBlock';

describe("TimeBlock", ()=> {
  const instructor = 123456;
  const times = [ 
        "2019-08-24T10:30:00-04:00",
        "2019-08-25T10:30:00-04:00"
    ];

  it('renders without crashing', ()=> {
    shallow(<TimeBlock times={times} instructor={instructor}/>);
  });

  it('should show available times if they exist', () => {

    const wrapper = shallow(<TimeBlock times={times} instructor={instructor} />);
    expect(wrapper.find('.book-time').length).toEqual(2);
  });

});



