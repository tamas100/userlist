import React, { Component } from 'react'

export default class UserItem extends Component {
  render() {
    return (
      <li>
        {this.props.name} ({this.props.email}): {this.props.adress}
      </li>
    )
  }
}
