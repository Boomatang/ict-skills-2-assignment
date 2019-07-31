import React, {Component} from 'react';
import {Badge, Col} from "antd";

class ChatSideSelect extends Component{

  state = {
    unread: this.props.user.unread
  };

  componentDidMount() {
    this.startEventSource(1, this.props.user.id)
  }

  startEventSource(to, from){
    console.error("Start Event Source Called");
    const channel = `${to}-${from}-status`;
    const eventSource = new EventSource(`http://localhost:5000/stream`);

    eventSource.addEventListener(channel, event => {
      const data = JSON.parse(event.data);
      console.log("I go a message : ", data);
      this.updateUnread(data.count)
    }, false);

    eventSource.addEventListener('error', event => {
      alert("Failed to connect to event stream. Is Redis running?");
    }, false);
  }

  updateUnread(count){
    let unread = this.state.unread;
    unread = unread + count;
    this.setState({unread: unread})
  }

  render() {
    return (

        <Col className={'center'}>
          {this.props.user.name}&nbsp;
          <Badge count={this.state.unread} overflowCount={10}>
          </Badge>
        </Col>

    )
  }

}

export default ChatSideSelect;