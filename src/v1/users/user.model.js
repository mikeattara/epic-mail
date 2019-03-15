import uuid from 'uuid';
import db from '../helpers/db';

export default class User {
  constructor({ firstName, lastName, email, hash, mobileNumber }) {
    this.id = uuid.v4();
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.hash = hash;
    this.mobileNumber = mobileNumber;
    this.createdAt = new Date();
    this.contacts = [];
    this.messages = [];
  }

  save() {
    return db.users.push(this);
  }

  static getUser({ email }) {
    let index = 0;
    let found = false;
    let foundUser;

    while (index < db.users.length && !found) {
      const user = db.users[index];
      if (user.email === email) {
        found = true;
        foundUser = user;
      }
      index += 1;
    }
    return foundUser;
  }

  static getUserById(id) {
    let index = 0;
    let found = false;
    let foundUser;

    while (index < db.users.length && !found) {
      const user = db.users[index];
      if (user.id === id) {
        found = true;
        foundUser = user;
      }
      index += 1;
    }
    return foundUser;
  }
}
