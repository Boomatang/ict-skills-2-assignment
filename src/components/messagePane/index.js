import React, {Component} from 'react';
import MessageList from '../messageList';
import SendBox from '../sendBox';

import { Layout } from 'antd';

const {  Content } = Layout;

class MessagePane extends Component {

  render(){
    return (
      <Content>
        <MessageList />
        <br/>
        <SendBox />

      </Content>
    )
  }
}

export default MessagePane;