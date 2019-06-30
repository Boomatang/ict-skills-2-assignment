import React, {Component} from 'react';
import './message.css'

class Message extends Component {

  render(){
    return (
    <div className="col-8 message-frame message-received">
      <div className={"sample text-info"}>
        {this.props.message.sender} : {this.props.message.timeStamp}
      </div>
      <div className={"sample"}>
        {this.props.message.message}
      </div>
    </div>
    )
  }
}

export default Message;