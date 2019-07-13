import React from 'react';
import './App.css';


import { Layout, Menu, Breadcrumb } from 'antd';
import MessagePane from "./components/messagePane";
import ChatSideBar from "./components/chatSideBar";

const { Header, Content, Footer } = Layout;

function App() {

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>


        <Layout style={{ padding: '24px 0', background: '#fff' }}>

          <ChatSideBar></ChatSideBar>

          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <MessagePane/>
          </Content>

        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

export default App;
