import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe("App", ()=> {
  beforeAll(() => {
    Date.now = jest.fn(() => 1590173622627) //2020-05-22
  });

  it('renders without crashing', ()=> {
    shallow(<App />);
  });

  it('renders the current time in yyyy-mm-dd format', () => {
    const wrapper = shallow(<App />);
    const time = "2020-05-22";
    expect(wrapper.contains(time)).toEqual(true);
  });

});



