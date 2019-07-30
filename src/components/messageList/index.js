import React, {Component} from 'react';
import Message from '../message';


class MessageList extends Component {

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