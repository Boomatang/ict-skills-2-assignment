import React, {Component} from 'react';
import {Badge, Col} from "antd";

class ChatSideSelect extends Component{

  render() {
    return (

        <Col className={'center'}>
          {this.props.user.name}&nbsp;
          <Badge count={this.props.user.unread} overflowCount={10}>
          </Badge>
        </Col>

    )
  }

}

export default ChatSideSelect;