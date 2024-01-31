import React, { Component } from 'react';
import UserItem from '../UserItem/UserItem';
import axios from 'axios';

export default class Userlist extends Component {

  state = {
        users: [
          
        ]
  }

  componentDidMount() {
    axios
      .get('https://randomuser.me/api/?results=3&nat=DE')
      .then(resp => {
        const users = resp.data.results
        for (let user of users) {
          this.insertElement(user);
        }
        console.log(users);
      });
    // fetch('https://randomuser.me/api/?results=3&nat=DE')
    // .then(resp => resp.json())
    // .then(users => {
    //     for (let user of users.results) {
    //       this.insertElement(user);
    //     }
    //     console.log(users);
    //   })
  }

  insertElement = (userData) => {
    const newUser = {
      name: `${userData.name.title} ${userData.name.first} ${userData.name.last}` ,
      adress: `${userData.location.street.name} ${userData.location.street.number}`, 
      email: `${userData.email}`, 
      key: `${userData.login.uuid}`
    };
   
    this.setState((state) => {
      return {users: [...state.users, newUser]}
    });
  }
  
  deleteElement = (key) => {
    const newUserList = this.state.users.filter(user => user.key !== key);
    this.setState({
      users: newUserList
    });
  }

  handleInsert = () => {
    axios
      .get('https://randomuser.me/api/?results=3&nat=DE')
      .then(resp => {
        const users = resp.data.results        
        this.insertElement(users[0]);        
        console.log(users);
      });
  }

  handleDelete = () => {
    const len = this.state.users.length; 
    if (len > 0) {
      const randomIndex = Math.trunc(Math.random() * len);
      const key = this.state.users[randomIndex].key
      this.deleteElement(key);
    }
  }

  render() {    
    const userItems = this.state.users.map(
      user => <UserItem name={user.name}
      adress={user.adress}
      email={user.email}
      key={user.key}
      id={user.key}
      handleClick={this.deleteElement} />
    );
    return (
      <>
      <ul>
        {userItems}
      </ul>
      <button onClick={this.handleInsert}>Beszúr</button>
      <button onClick={this.handleDelete}>Töröl</button>      
      </>
    )
  }
}