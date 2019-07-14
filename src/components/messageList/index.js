import React, {Component} from 'react';
import Message from '../message';


class MessageList extends Component {

  render() {

    const temp_data = [
      {
        id: 1,
        sender: "Fake User 1",
        timeStamp: "13:40 Wed 19/04/2019",
        message: "This is a message 1. And this is a long message just to get it to wrap around"
      },
      {
        id: 2,
        sender: "Fake User 1",
        timeStamp: "13:42 Wed 19/04/2019",
        message: "This is a message 2 And this is a long message just to get it to wrap around"
      },
      {
        id: 3,
        owner: true,
        sender: "Fake User 2",
        timeStamp: "13:45 Wed 19/04/2019",
        message: "This is a message 3 And this is a long message just to get it to wrap around"
      },
      {
        id: 4,
        sender: "Fake User 1",
        timeStamp: "13:48 Wed 19/04/2019",
        message: "This is a message 4 And this is a long message just to get it to wrap around"
      }
    ];

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