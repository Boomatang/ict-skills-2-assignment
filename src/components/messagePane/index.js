import React, {Component} from 'react';
import MessageList from '../messageList';
import SendBox from '../sendBox';

class MessagePane extends Component {

  render(){
    return (
      <div className={"h-100 w-100 sample bg-info"}>
        <MessageList />
        <br/>
        <SendBox />

      </div>
    )
  }
}

export default MessagePane;