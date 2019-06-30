import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../../fontawesome";

class SendBox extends Component{

  render() {
    return (
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Message"/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              <FontAwesomeIcon icon={["fas", "paper-plane"]}/>
              <span> Send</span></button>
          </div>
      </div>
    )
  }
}

export default SendBox;