import React, {Component} from 'react';
import Message from '../message';


class MessageList extends Component {

  // messageCards = [];
  //
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log("component did update");
  //   this.startEventSource(this.props.userData.sender, this.props.userData.receiver);
  //   this.messageCards = this.props.messages.map( m => (
  //     <Message key={m.id} message={m}/>
  //   ));
  //
  // }
  //
  // componentDidMount() {
  //   console.log("component did mount");
  //   this.startEventSource(this.props.userData.receiver, this.props.userData.sender)
  // }

  startEventSource(to, from){
    const channel = `${to}-${from}`;
    console.log("channel : ", channel);
    this.props.eventSource.addEventListener(channel, event => {this.props.messageEvent(event)}, false);

  }

  render() {
    const messageCards = this.props.messages.map( m => (
      <Message key={m.id} message={m}/>
    ));

    return (
      <div>
        {messageCards}
      </div>
    )}
}

export default MessageList;