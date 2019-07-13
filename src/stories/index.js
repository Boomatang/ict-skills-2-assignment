import React from 'react';

import { storiesOf } from '@storybook/react';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Message from '../components/message';
import MessageList from '../components/messageList';
import SendBox from '../components/sendBox';
import MessagePane from '../components/messagePane'

const message =
  {
    id: 1,
    sender: "Fake User 1",
    timeStamp: "13:40 Wed 19/04/2019",
    message: "This is a message 1. And this is a long message just to get it to wrap around"
  };

let message1 = {...message, sender: "User = Sender", owner: true};

storiesOf("Messages", module)
  .add("Single Message Received", () =><Message message={message}/>)
  .add("Single Message Sent", () =><Message message={message1}/>)
  .add("List of Messages", () => <MessageList/>)
  .add("Full Message Pane", () => <MessagePane/>);

storiesOf("Send Box", module)
  .add("Default", () => <SendBox/>);

storiesOf("User components", module)
  .add("Chat button", () => "Button with user people to chat withs name")
  .add("Chat button with unread messages", () => "Button with label of unread messages")
  .add("List of chats", () => "List of chat buttons with some having unread messages");