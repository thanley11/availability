import React, { Component } from 'react'

class NameInput extends Component {
    constructor(props) {
        super(props);
        this.inputName = this.inputName.bind(this);
      }
    inputName = (name) => {
       this.props.nameCallback(name)
    }

render(){
    const {showError} = this.props;
    return (
        <div>
          <form id="name-form" className="col-md-6">
          <div className="form-group">
            <label htmlFor="name-field">Your Name</label>
            <input type="text" id="name-field" className={showError ? "error" : ""} onChange={e => this.inputName(e.target.value)} />
            {showError && 
            <label htmlFor="" className="danger-text">
               <small>Please enter a name</small> 
            </label>
             }
          </div>
        </form>
        </div>
    )
            }
}

export default NameInput;
