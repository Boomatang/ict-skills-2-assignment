import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../../fontawesome";
import {Button, Input} from "antd";

const {Search, TextArea } = Input;
const InputGroup = Input.Group;

class SendBox extends Component {



  render() {
    const btn = (<Button type={"primary"} icon={'message'}>
      <span> Send Message</span>
    </Button>);
    return (
      <div className="container-fluid align-self-baseline">
        <div className="input-group mb-3">
          <InputGroup compact>
            <TextArea style={{width: '80%'}} placeholder="Message to send" autosize={{minRows:1}}/>
            <Button style={{width: '20%'}} type={"primary"} icon={'message'}>
              <span> Send Message</span>
            </Button>
          </InputGroup>
        </div>

      </div>
    )
  }
}

export default SendBox;