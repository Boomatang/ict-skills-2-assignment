import React, {Component} from 'react';
import MessageList from '../messageList';
import SendBox from '../sendBox';

import { Layout } from 'antd';

const {  Content } = Layout;

class MessagePane extends Component {

  render(){
    return (
      <Content>
        <MessageList messages={this.props.messages}
                     value={this.props.value}
                     eventSource={this.props.eventSource}
                     messageEvent={this.props.messageEvent}
                     userData={this.props.userData}
        />
        <br/>
        <SendBox onClick={this.props.onClick} onChange={this.props.onChange}/>
      </Content>
    )
  }
}

export default MessagePane;