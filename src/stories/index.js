import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Message from '../components/message';
import MessageList from '../components/messageList';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

const message =
  {
    id: 1,
    sender: "Fake User 1",
    timeStamp: "13:40 Wed 19/04/2019",
    message: "This is a message 1. And this is a long message just to get it to wrap around"
  };
storiesOf("Messages", module)
  .add("Single Message", () =><Message message={message}/>)
  .add("List of Messages", () => <MessageList/>);
