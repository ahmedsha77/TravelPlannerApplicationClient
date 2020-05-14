import React, { Component } from 'react';
import axios from 'axios';


export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    axios.post('https://travel-planner123.herokuapp.com/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <h2>Create New User</h2>
        <br/>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label><h5>Username: </h5></label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <p>Username will be stored and displayed in the username dropdown list. After clicking the button, click 'Create a Vacation Log' to select your username and create your vacation log.</p>
            <br/>
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
