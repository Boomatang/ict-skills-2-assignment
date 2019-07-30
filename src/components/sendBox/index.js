import React, {Component} from 'react';
import "../../fontawesome";
import {Button, Input} from "antd";
import request from "superagent";

const {TextArea} = Input;
const InputGroup = Input.Group;

class SendBox extends Component {

  state = {};

  handleMessageSend = item => {
    console.groupCollapsed('Sending message');

    if (this.state.text !== null) {
      console.log("Button was Pressed");
      console.log('Message been sent to : ', this.props.receiver);
      console.log('Date: ', Date());
      console.log("item: ", (item));
      console.log("this.sate: ", this.state);


      const timestamp = new Date();

      // /{timestamp: timestamp, body: item, sender: '1'}

      const body = this.state.text;
      console.log("Body : ", body);
      request.post(`http://localhost:5000/msg/${this.props.receiver}`, {timestamp: timestamp, body: body, sender: '1'}).end((error, res) => {
        if (res) {
          console.log("received", res);
        } else {
          console.log(error);
        }
      });
      this.setState({text: null})
    } else {
      console.log('Blank text box')
    }
    console.groupEnd();
  };

  handleTextChange = e => {
    this.setState({text: e.target.value})
  };

  render() {

    return (
      <div className="container-fluid align-self-baseline">
        <div className="input-group mb-3">
          <InputGroup compact>
            <TextArea style={{width: '80%'}} placeholder="Message to send" autosize={{minRows: 1}}
                      onChange={this.handleTextChange} value={this.state.text}/>
            <Button style={{width: '20%'}} type={"primary"} icon={'message'} onClick={this.handleMessageSend}>
              <span> Send Message</span>
            </Button>
          </InputGroup>
        </div>

      </div>
    )
  }
}

export default SendBox;