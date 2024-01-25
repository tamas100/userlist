import React, { Component } from 'react';
import UserItem from '../UserItem/UserItem';

export default class Userlist extends Component {

    state = {
        users: [
          
        ]
      }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=3&nat=DE')
    .then(resp => resp.json())
    .then(users => {
        for (let user of users.results) {
          this.insertElement(user);
        }
        console.log(users);
      })
  }

  insertElement = (userData) => {
    const newUser = {
      name: `${userData.name.title} ${userData.name.first} ${userData.name.last}` ,
      adress: `${userData.location.street.name} ${userData.location.street.number}`, 
      email: `${userData.email}`, 
      key: `${userData.login.uuid}`
    };
    const newUserList = [...this.state.users, newUser]
    this.setState({
      users: newUserList 
    });
  }
  
  deleteElement = (key) => {
    const newUserList = this.state.users.filter(user => user.key !== key);
    this.setState({
      users: newUserList
    });
  }

  handleInsert = () => {
    this.insertElement("NEW", "NEW Super Str. 1", "n@ew.de");
  }

  handleDelete = () => {
    this.deleteElement(1);
  }

  render() {    
    const userItems = this.state.users.map(
        user => <UserItem name={user.name} 
                        adress={user.adress} 
                        email={user.email}
                        key={user.key}/>
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