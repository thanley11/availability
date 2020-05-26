import { createStore, applyMiddleware, compose } from 'redux';
import bookingReducer from './reducer'
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(bookingReducer, composeEnhancers(
    applyMiddleware(thunk)
  ));