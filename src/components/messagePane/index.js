import React, {Component} from 'react';
import MessageList from '../messageList';
import SendBox from '../sendBox';

import { Layout } from 'antd';

const {  Content } = Layout;

class MessagePane extends Component {

  render(){
    return (
      <Content>
        <MessageList messages={this.props.messages} />
        <br/>
        <SendBox onClick={this.props.sendMessage} receiver={this.props.receiver}/>

      </Content>
    )
  }
}

export default MessagePane;