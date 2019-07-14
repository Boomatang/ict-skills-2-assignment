import _ from "lodash";
import request from "superagent";

class StubAPI {

  url ='http://localhost:5000/';


  constructor() {
    this.contacts = [];
  }

  find(id) {
    let index = _.findIndex(
      this.contacts,
      contact => `${contact.phone}${contact.cell}` === id
    );
    if (index !== -1) {
      return this.contacts[index];
    }
    return null;
  }

  delete(k) {
    let elements = _.remove(this.contacts, contact => contact.phone === k);
    return elements;
  }

  initialize(contacts) {
    this.contacts = contacts;
  }

  getAll(){
    return this.contacts;
  }

  update(key, email, phone) {
    let index = _.findIndex(this.contacts, contact => contact.phone === key);
    if(index !== -1) {
      this.contacts[index].phone = phone;
      this.contacts[index].email = email;
      return true;
    }
    return false;
  }

  getMessages(sender){
    const receiver = 1;
    request.post('http://localhost:5000/msg', {sender: sender, receiver: receiver}).end((error, res) => {
      console.groupCollapsed('Setting up messages');
      console.log('sender : ', sender);
      console.log('receiver : ', receiver);
      if (res) {
        console.log('request : ', res);
        let { messages: messages } = JSON.parse(res.text);
        console.log("messages", messages);

      } else {
        console.log(error);
      }
      console.groupEnd();
    });
  }
}

export default new StubAPI();