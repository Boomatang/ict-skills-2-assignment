import React, {Component} from 'react';
import {Row, Col} from "antd";
import './message.css'

import {Typography} from "antd";

const {Paragraph, Text} = Typography;

class Message extends Component {

  config = {
    offset: 0,
    type: 'message-received'
  };

  compare_side() {
    if (this.props.message.owner) {
      this.config.offset = 10;
      this.config.type = 'message-sender';
    }

  }

  render() {
    this.compare_side();

    return (
      <div>
        <Row>
          <Col span={14} offset={this.config.offset}>
            <div className={`message-frame ${this.config.type}`}>
              <Text type={"danger"}>
                {this.props.message.sender} : {this.props.message.timestamp}
              </Text>
              <Paragraph>
                {this.props.message.message}
              </Paragraph>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Message;