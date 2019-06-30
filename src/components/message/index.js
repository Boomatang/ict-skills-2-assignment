import React, {Component} from 'react';
import './message.css'

class Message extends Component {


  compare_side (){
    if(this.props.message.owner){
      return 'justify-content-end text-right'
    }
  }

  render(){

    return (
<div className={`row ${this.compare_side()}`}>
    <div className={`col-8  sample message-frame message-received`}>
      <div className={"sample text-info"}>
        {this.props.message.sender} : {this.props.message.timeStamp}
      </div>
      <div className={"sample"}>
        {this.props.message.message}
      </div>
    </div>
</div>
    )
  }
}

export default Message;