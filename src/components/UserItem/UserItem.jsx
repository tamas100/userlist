import React, { Component } from 'react'

export default class UserItem extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.handleClick(this.props.id);
  };
  render() {
    return (
      <li>
        {this.props.name} ({this.props.email}): {this.props.adress}
        <button onClick={this.handleClick}>Törlés</button>
      </li>
    )
  }
}
