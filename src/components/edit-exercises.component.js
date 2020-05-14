import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeTransportation = this.onChangeTransportation.bind(this);
    this.onChangeHotel = this.onChangeHotel.bind(this);
    this.onChangePassengers = this.onChangePassengers.bind(this);
    this.onChangeDays = this.onChangeDays.bind(this);
    this.onChangeStartdate = this.onChangeStartdate.bind(this);
    this.onChangeEnddate = this.onChangeEnddate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        username: '',
        location: '',
        transportation: '',
        hotel: '',
        passengers: '',
        days: '',
        startdate: new Date(),
        enddate: new Date(),
        users: []
    }
  }

  componentDidMount() {
    axios.get('https://travel-planner123.herokuapp.com/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          location: response.data.location,
          transportation: response.data.transportation,
          hotel: response.data.hotel,
          passengers: response.data.passengers,
          days: response.data.days,
          startdate: new Date(response.data.startdate),
          enddate: new Date(response.data.enddate),

        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('https://travel-planner123.herokuapp.com/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  onChangeTransportation(e) {
    this.setState({
      transportation: e.target.value
    })
  }

  onChangeHotel(e) {
    this.setState({
      hotel: e.target.value
    })
  }
  onChangePassengers(e) {
    this.setState({
      passengers: e.target.value
    })
  }
  onChangeDays(e) {
    this.setState({
      days: e.target.value
    })
  }
  onChangeStartdate(date) {
    this.setState({
      startdate: date
    })
  }

  onChangeEnddate(date) {
    this.setState({
      enddate: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
        username: this.state.username,
        location: this.state.location,
        transportation: this.state.transportation,
        hotel: this.state.hotel,
        passengers: this.state.passengers,
        days: this.state.days,
        startdate: this.state.startdate,
        enddate: this.state.enddate,
    }

    console.log(exercise);

    axios.post('https://travel-planner123.herokuapp.com/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h2>Edit Exercise Log</h2>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Destination: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.location}
              onChange={this.onChangeLocation}
              />
        </div>
        <div className="form-group"> 
          <label>Transportation: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.transportation}
              onChange={this.onChangeTransportation}
              />
        </div>
        <div className="form-group"> 
          <label>Hotel/Housing: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.hotel}
              onChange={this.onChangeHotel}
              />
        </div>
        <div className="form-group"> 
          <label>Number of Passengers: (Number only)</label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.passengers}
              onChange={this.onChangePassengers}
              />
        </div>
        <div className="form-group">
          <label>Number of Days: (Number only)</label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.days}
              onChange={this.onChangeDays}
              />
        </div>
        <div className="form-group">
          <label>Start Date: </label>
          <div>
            <DatePicker
              selected={this.state.startdate}
              onChange={this.onChangeStartdate}
            />
          </div>
        </div>
        <div className="form-group">
          <label>End Date: </label>
          <div>
            <DatePicker
              selected={this.state.enddate}
              onChange={this.onChangeEnddate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Vacation Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
