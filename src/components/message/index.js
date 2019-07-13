import React, {Component} from 'react';
import { Row, Col } from "antd";
import './message.css'

class Message extends Component {


  compare_side (){
    if(this.props.message.owner){
      return 24
    }
  }

  render(){

    return (
/*<div className={`row ${this.compare_side()}`}>*/
      <div>
  <Row>
  <Col span={8}>
    <div className={`sample message-frame message-received`}>
      <div className={"sample text-info"}>
        {this.props.message.sender} : {this.props.message.timeStamp}
      </div>
      <div className={"sample"}>
        {this.props.message.message}
      </div>
    </div>
  </Col>
  </Row>
      </div>
    )
  }
}

export default Message;