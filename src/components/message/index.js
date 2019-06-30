import React, {Component} from 'react';
import './message.css'

class Message extends Component {

  render(){
    return (
    <div className="col-8 message-frame message-received">
      <div className={"sample text-info"}>
        Fake User : 13:37 Wed 19/04/2019
      </div>
      <div className={"sample"}>
        <p>Body of message is going in here.
        And this is a long message just to get it to wrap around</p>
      </div>
    </div>
    )
  }
}

export default Message;