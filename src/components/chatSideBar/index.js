import {Layout, Menu} from "antd";
import React, {Component} from "react";
import ChatSideSelect from '../chatSideSelect';

import './chatSideBar.css'

const {Sider} = Layout;

class ChatSideBar extends Component {

  data = [
    {
      id: 1,
      name: 'Joan',
      unread: 8
    },
    {
      id: 2,
      name: 'Tom',
      unread: 0
    },
    {
      id: 3,
      name: 'Frank',
      unread: 101
    },
    {
      id: 4,
      name: 'Anne',
      unread: 8
    },
    {
      id: 5,
      name: 'Fake user 1',
      unread: 11
    },
    {
      id: 6,
      name: 'Tim Alan',
      unread: 0
    },
  ];

  render() {

    let start_id = false;

    const chats = this.data.map(m => {
      if (!start_id) {
        start_id = m.id;
      }

      return (
      <Menu.Item key={`${m.id}`}>
        <ChatSideSelect user={m}></ChatSideSelect>
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