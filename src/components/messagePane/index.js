import React, {Component} from 'react';
import MessageList from '../messageList';
import SendBox from '../sendBox';

import { Layout } from 'antd';

const {  Content } = Layout;

class MessagePane extends Component {

  render(){
    return (
      <Content>
        <MessageList messages={this.props.messages} value={this.props.value}/>
        <br/>
        <SendBox onClick={this.props.onClick} onChange={this.props.onChange}/>
      </Content>
    )
  }
}

export default MessagePane;