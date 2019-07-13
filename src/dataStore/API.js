import _ from "lodash";

class StubAPI {
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
}

export default new StubAPI();