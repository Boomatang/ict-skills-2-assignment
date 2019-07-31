import React, {Component} from 'react';
import Message from '../message';
import request from "superagent";


class MessageList extends Component {

  // state = {
  //   messages:[],
  //   receiver: ''
  // };
  //
  // componentDidMount() {
  //   this.getMessages(2, 1)
  // }
  //
  // getMessages(receiver, sender){
  //   console.log("what is going on");
  //   request.post('http://localhost:5000/msg', {sender: sender, receiver: receiver}).end((error, res) => {
  //     console.groupCollapsed('Setting up messages');
  //     if (res) {
  //       let { messages: messages } = JSON.parse(res.text);
  //       this.setState({
  //         messages: messages,
  //         receiver: receiver
  //       })
  //
  //     } else {
  //       console.log(error);
  //     }
  //     console.groupEnd();
  //   });
  // }

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