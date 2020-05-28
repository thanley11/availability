import React from 'react';
import { shallow } from 'enzyme';
import NameInput from './NameInput';
import * as redux from 'react-redux';

describe("NameInput", ()=> {
  const dispatchSpy = jest.spyOn(redux, 'useDispatch')
  dispatchSpy.mockReturnValue({})
  const instructor = 123456;
 
  it('renders without crashing', ()=> {
    shallow(<NameInput showInputError={false} />);
  });

  it('should show available times if they exist', () => {

    const wrapper = shallow(<NameInput  showInputError={true} />);
    expect(wrapper.contains("Please enter a name")).toEqual(true);
  });

});



