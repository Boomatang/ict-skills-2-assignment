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
    contacts: [],
    messages: [],
    text: null,
    channel: null,
    user: 1
  };

  constructor(props){

    super(props);
    this.eventSource = new EventSource(`http://localhost:5000/stream`);

  }


  componentWillMount() {
    this.getUser();
  }

  getUser(){
    request.get("http://localhost:5000/user").end((error, res) => {
      console.groupCollapsed('Setting up users');

      if (res) {
        let { users: contacts } = JSON.parse(res.text);
        // api.initialize(contacts);
        this.setState({contacts: contacts});
      } else {
        console.log(error);
      }
      console.groupEnd();
    });
  }

  getMessagesHandler = (item, e) => {
    console.log("I was pressed");
    const user = this.state.user;
    this.getMessages(item.key, user);
    this.startEventSource(user, item.key);
    this.markAllRead(1, item.key)
  };

  markAllRead(user, senderId){
    request.post('http://localhost:5000/msg/status', {user: user, senderId: senderId}).end((error, res) => {
      console.groupCollapsed('Setting up messages');
      if (res) {
        console.log(res)
      } else {
        console.log(error);
      }
      console.groupEnd();
    });
  }

  getMessages(receiver, sender){
    console.log("what is going on");
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

  startEventSource(to, from){
    console.error("Start Event Source Called");
    const channel = `${to}-${from}`;
    console.log('channel : ', channel);
    const prevChannel = this.state.channel;
    console.log('prevChannel : ', prevChannel);
    // this.setState({channel: channel});
    this.state.channel = channel;
    console.log('state.channel : ', this.state.channel);
    // const eventSource = new EventSource(`http://localhost:5000/stream`);

    if(prevChannel !== null) {
      console.log('prevChannel : ', prevChannel);
      console.log(this.eventSource.url);
      this.eventSource.removeEventListener(prevChannel, this.messageEvent);
      console.log('Removed old channel event listener')

    }

    this.eventSource.addEventListener(channel, event => {this.messageEvent(event)}, false);

    this.eventSource.addEventListener('error', event => {this.failedConnect(event)}, false);
  }

  messageEvent(event){
    const data = JSON.parse(event.data);
    console.groupCollapsed("Stream Data");
    console.log("Data Stream : ", data);

    console.log("this.state", this.state);
    console.groupEnd();

    const messages = [...this.state.messages, data.message];

    this.setState({
      messages: messages
    })
  }

  failedConnect(event){
    // alert("Failed to connect to event stream. Is Redis running?");
    console.error(event)
  }

  handleMessageSend = item => {
    console.groupCollapsed('Sending message');
    if (this.state.text !== null) {
      console.log("Button was Pressed");
      console.log('Message been sent to : ', this.props.receiver);
      console.log('Date: ', Date());
      console.log("item: ", (item));

      const timestamp = new Date();
      const body = this.state.text;
      request.post(`http://localhost:5000/msg/${this.state.receiver}`, {timestamp: timestamp, body: body, sender: '1'}).end((error, res) => {
        if (res) {
          console.log("received", res);
          const data = JSON.parse(res.text);
          console.log("data : ", data);
          const messages = [...this.state.messages, data.message];

          this.setState({
            messages: messages
          })
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
    this.setState({text: e.target.value});
  };

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

            <ChatSideBar users={this.state.contacts}
                         messageOnClick={this.getMessagesHandler}
                         eventSource={this.eventSource}
            />

            <Content style={{padding: '0 24px', minHeight: 280}}>
              <MessagePane messages={this.state.messages}
                           onClick={this.handleMessageSend}
                           onChange={this.handleTextChange}
              />
            </Content>

          </Layout>
        </Content>
        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

export default App;
