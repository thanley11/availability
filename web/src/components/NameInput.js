import React from 'react'
import { useDispatch } from 'react-redux';
import { setName } from '../store/actions';

export default function NameInput(props) {
    const {showInputError} = props;
    const dispatch = useDispatch();

    return (
            <div>
              <form id="name-form" className="col-md-6">
              <div className="form-group">
                <label htmlFor="name-field">Your Name</label>
                <input type="text" id="name-field" className={showInputError ? "error" : ""} onChange={e => dispatch(setName(e.target.value))} />
                {showInputError && 
                <label htmlFor="" className="danger-text">
                   <small>Please enter a name</small> 
                </label>
                 }
              </div>
            </form>
            </div>
    )
}