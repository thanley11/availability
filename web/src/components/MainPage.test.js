import React from 'react';
import { shallow } from 'enzyme';
import MainPage from './MainPage';
import * as redux from 'react-redux';

const dispatchSpy = jest.spyOn(redux, 'useDispatch')
const selectorSpy = jest.spyOn(redux, 'useSelector')
dispatchSpy.mockReturnValue({})
selectorSpy.mockReturnValue({})

describe("MainPage", ()=> {

  it('renders without crashing', ()=> {
    shallow(<MainPage />);
  });

});



