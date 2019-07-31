import {Layout, Menu} from "antd";
import React, {Component} from "react";
import ChatSideSelect from '../chatSideSelect';

import './chatSideBar.css'


const {Sider} = Layout;

class ChatSideBar extends Component {


  render() {

    let start_id = false;

    const chats = this.props.users.map(m => {
      if (!start_id) {
        start_id = m.id;
      }
      return (
        <Menu.Item key={`${m.id}`} onClick={this.props.messageOnClick}>
          <ChatSideSelect user={m}/>
        </Menu.Item>
      )
    });

    return (

      <Sider>
        <Menu
          mode="inline"
          defaultSelectedKeys={[`${start_id}`]}
          style={{height: '100%'}}
        >
          {chats}

        </Menu>
      </Sider>
    );
  }
}

export default ChatSideBar