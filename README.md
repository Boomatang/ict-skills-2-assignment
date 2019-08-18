# ICT Skills 2 Assignment - Single Page App.
Name: Jim Fitzpatrick

## Overview
The aim of this project was to create a simple chat application and explore how web sites can receive data with refreshing. 
Some of the key features the chat application has:
* Main chat window that shows sent messages on the right and received messages on the left.
* A list view to allow user select which chat to look at.
* Each chat in the list view will show the number of unread messages as they are received.
* The counter of unread message gets reset when a user view the chat.
* If a user receives a message when in the chat view. The message is auto added to the list.

## Running the Application
### Prerequisites
* npm installed
* python 3.6 or greater
* pipenv - can be installed using `pip install pipenv`
* Redis

### Running the application
All commands are run from the project root folders.

#### Step 1
Start the backend server. This will start redis if not running and set up the python environment

`./server/run_server.sh`

This step will install all the required modules in a python environment and star a redis server.

#### Step 2
Start the front end which is been server using `npm`

`npm install`

`npm run start` 

The app should now be running on [localhost:3000](http://localhost:3000)

## Data Model Design
A full model design of the data can be found here on [ponyorm.com](https://editor.ponyorm.com/user/Boomatang/ict2chat/designer), this will give the required cod to set the tables up in different systems.
The reason for the very simple data model was not to complete the pub/sub models. By only using the bear minimum to get it to work. Of course this could eb expended on.

## UI Design

The UI design is very basic, There is only these few different elements.

In the chat stream you will notice that the senders messages are on the left side of the screen. While the receivers massages are on the right side.

![Chat Stream](/docs-images/chat-stream.jpg?raw=true)


In the chat selection window you can see what chat is selected. How may chats have unread messages. This view is a sorted view.

![Chat Selection](/docs-images/chat-select.png?raw=true)

## Routing
This app is done with no routing. When the user changes between app the different chats request calls are sent to hte sever to create the retrieve the different api data.
## Storybook

## Backend
The back end has been write in python. The choice for doing the backend in a different language was to see if this makes any difference. With the number of apis that are on the web a user is not always going to be using the same program language. There was some issue due to the miss match in languages which is talked about in the independent learning section.

### API Routes

`http://$host/user  {Methods: ['GET']}`
> `GET` Returns a list of all the users in the system

`http://$host/msg  {Methods: ['POST']}`
> `POST` Get a list of massages from a server between to users.
> 
> Payload required `{'sender': id, 'receiver': id}`
>
> Return response 
>```json 
>{'total`: int, 
>'messages': [
>    {
>        'id': int,
>        'owner': string,
>        'sender': string,
>        'timestamp' string,
>        'message': string
>    },
> ]
>```

`http://$host/msg/status  {Methods: ['POST']}`

> `POST` Marks all unread messages as read for that sender to the user
> 
> Payload required `{'senderId': id, 'user': id}`
>
> Return response 
>```json 
>{'status': 'ok'}
> 'status_code': 202
>```

`http://$host/msg/<int: receiver>  {Methods: ['POST']}`

> `POST` Send a message to the server for intended receiver
> 
> Payload required 
>```json 
>{
> 'sender': int,
> 'body': string
> 'timestamp': dateTime
>}`
>```
>
> Return response 
>```json 
>{'message': message}
> 'status_code': 201
>```

`http://$host/stream  {Methods: ['GET']}`

> `GET` sends channel information out. The two main channel types are:
> `'sender'-'receiver'` and `'sender'-'receiver'-status`


## Independent Learning
Most of this assignment was spent looking into how subscription/publish model works in websites.
While the concept is simple and the parts as a singlure are simple, once these parts are chained together, funny things start happening.
In this section some of the issue that arose will trying to implment the chat function.
Also in this section the reason behind using [ant.design](https://ant.design) and what issue that solved and created.

### Pub/Sub Learning
In modern web applications there is notifications and other events updating how the screen looks.
I wanted to explore how this may work with in a react app.
This was not flawless exercise and there are many challenges to the task.

A basic brake down of the work flow is.
- The client subscribes to a channel on the server.
- The server sends out messages on that channel, which the client can pick up.
- The client reacts to the message and takes action around this.

#### Challenges
- Debugging gets much harder as now you have to explore the network communications also. 
- JSON is not json. Teh format of you message needs to very clear when sending to servers. Ome issue that I was having react would not convert a object into json correctly before sending to the server. This made the server throw errors saying the input was invalid. The note fact was when ever this happened the message was sent to the server with `OPITIONS` method and not a `POST` method.
- Setting up event streams is easy when the application starts. But closing an event stream when new data is been loaded some times worked. This happens when changing the chat channels. Messages from one user may get posted in the wrong channel.
- Give state to event handlers is not easy. It may be made easier with using `Redux` which was not done here.
- Best working event handler takes care of the badges that display the unread messages. All of these are set up at app start up.

#### Missing Features & Errors
- The largest error is how some times the event handlers dont switch to the different chat channels. I am unsure of how to fix this issue.
- There is no security on the channels or in the app. I did look into how you add authentication to the streams but as the app didnt have any login system this was a bridge to far.
- Only the default user can be logged in. 

### Ant.design
[Ant.design](https://ant.design) is an open source project, which provide components to use in React, that has come from the people at [Alibaba.com](https://alibaba.com).
What insterted me in this library are these two main points.

#### The design of the online documentation. 
* It is very easy to follow with clear examples and a list of properties avabile to the compents. 
* For most examples there is examples on [codepen.io](https://codepen.io) and [codesandbox.io](https://codesandbox.io/). Which made it very easy to try my ideas out with very little upfront effort.

#### Selection of componts
* There is a large arrey of componts which are in sesnsible catorgies
* As Ant.design was born out of Alibaba, the componts are focused around desplying detailed information. By this I mean in comparestion to [Bootstrap](https://getbootstrap.com) which had its start in twitter, Ant.Design is more focused on displaying product information over socail information.

With the amount of compents avalible here are some that are quite nice.
[Nested Tables](https://ant.design/components/table/#components-table-demo-nested-table) are a very tidy way of add more information into a table that may some times be required.
[Time Line with Color](https://ant.design/components/timeline/#components-timeline-demo-color) would be a great way to show stages of a process and requires so little steps to create.
[Notice Calender](https://ant.design/components/calendar/#components-calendar-demo-notice-calendar) really removes alot of work when trying to create a calender. I do wish I could have used a calender in this project just by how simple it is to get so much information. 

That is only three of the many componets there is in the library that is worth exploring. In my view if the project you are working on requires displaying information in a clear and perssies manner then ant.design is a great starting point. By looking through the compents its easy to see the benssius focus over over social focus. 
With that said there is a some down falls to using it.

#### Help and Documentation
As good as the documentation is there will be times you need to search for answers to questions not covered in the documentation, Ant.design is chinese. This means it can be hard find information in english for the librery. With that said the 2019 suravy on [stateofcss.com](https://2019.stateofcss.com/technologies/) shows nice resluts for ant.design but its still not the big player in the market.

#### Storybook will not work out of the box
The are work arounds to get [storybook.js.org](https://storybook.js.org/) working with but this is harder when a project is already started. For this assignment the choice was made to drop storybook in order to explore ant.design. 

#### Learning Review
For all that I like about ant.design, not been able to easly use stroybook was a drawback and probably should not have used it for this project. The documentation is good and most things can be solved with out having to look for information else where. On the website the [Guidelines Section](https://ant.design/docs/spec/introduce) gives use tips on how a page should be designed and speaks about Principles, Visual, Patterns and more. It is well worth a read.

Going forward would I use this library again? Yes! For the types of projects I have worked on, the compents here would have really helped. Overall its a good library if you can put in the little extra work to get storybook working and other bits like that.

