import React, {Component} from 'react';
import "../../fontawesome";
import {Button, Input} from "antd";

const {TextArea} = Input;
const InputGroup = Input.Group;

class SendBox extends Component {

  render() {

    return (
      <div className="container-fluid align-self-baseline">
        <div className="input-group mb-3">
          <InputGroup compact>
            <TextArea style={{width: '80%'}} placeholder="Message to send" autosize={{minRows: 1}}
                      onChange={this.props.onChange}/>
            <Button style={{width: '20%'}} type={"primary"} icon={'message'} onClick={this.props.onClick}>
              <span> Send Message</span>
            </Button>
          </InputGroup>
        </div>

      </div>
    )
  }
}

export default SendBox;
