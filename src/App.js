import React, {Component} from 'react';
import request from "superagent";
import api from "./dataStore/API"
import './App.css';


import { Layout, Menu, Breadcrumb } from 'antd';
import MessagePane from "./components/messagePane";
import ChatSideBar from "./components/chatSideBar";

const { Header, Content, Footer } = Layout;

class App extends Component {

  state = {
    messages: [],
    text: null
  };


  componentWillMount() {
    this.getUser();
  }

  getUser(){
    request.get("http://localhost:5000/user").end((error, res) => {
      console.groupCollapsed('Setting up users');

      if (res) {
        let { users: contacts } = JSON.parse(res.text);
        api.initialize(contacts);
        this.setState({});
      } else {
        console.log(error);
      }
      console.groupEnd();
    });
  }

  getMessagesHandler = (item, e) => {
    const sender = 1;
    this.getMessages(item.key, sender);
    this.startEventSource();
  };

  getMessages(receiver, sender){
    request.post('http://localhost:5000/msg', {sender: sender, receiver: receiver}).end((error, res) => {
      console.groupCollapsed('Setting up messages');
      if (res) {
        let { messages: messages } = JSON.parse(res.text);
        this.setState({
          messages: messages,
          receiver: receiver
        })

      } else {
        console.log(error);
      }
      console.groupEnd();
    });
  }


  startEventSource(){
    console.error("Start Event Source Called");

    const eventSource = new EventSource(`http://localhost:5000/stream`);
    eventSource.addEventListener('greeting', event => {
      const data = JSON.parse(event.data);
      console.groupCollapsed("Stream Data");
      console.log("Data Stream : ", data);

      console.log("this.state", this.state);
      console.groupEnd();

      const messages = [...this.state.messages, data.message];

      this.setState({
        messages: messages
      })
    }, false);

    eventSource.addEventListener('error', event => {
      alert("Failed to connect to event stream. Is Redis running?");
    }, false);
  }


  render() {


    return (
      <Layout>
        <Header className="header">
          <div className="logo"/>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{lineHeight: '64px'}}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{padding: '0 50px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>


          <Layout style={{padding: '24px 0', background: '#fff'}}>

            <ChatSideBar users={api.getAll()} messageOnClick={this.getMessagesHandler}/>

            <Content style={{padding: '0 24px', minHeight: 280}}>
              <MessagePane messages={this.state.messages} receiver={this.state.receiver}/>
            </Content>

          </Layout>
        </Content>
        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

export default App;
