import React, { Component } from 'react'
import HelpBlock from './HelpBlock';

class NameInput extends Component {
    constructor(props) {
        super(props);
        this.inputName = this.inputName.bind(this);
      }
    inputName = (name) => {
       this.props.nameCallback(name)
    }

render(){
    return (
        <div>
          <form id="name-form" className="col-md-6">
          <div className="form-group">
            <label htmlFor="name-field">Your Name</label>
            <input type="text" id="name-field" className="form-control" onChange={e => this.inputName(e.target.value)} />
            {/* {this.state.errors && <HelpBlock>{this.state.errors}</HelpBlock>} */}

          </div>
        </form>
        </div>
    )
            }
}

export default NameInput;
