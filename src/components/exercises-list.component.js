import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.location}</td>
    <td>{props.exercise.transportation}</td>
    <td>{props.exercise.hotel}</td>
    <td>{props.exercise.passengers} Passengers</td>
    <td>{props.exercise.days} Days</td>
    <td>{props.exercise.startdate.substring(0,10)}</td>
    <td>{props.exercise.enddate.substring(0,10)}</td>

    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('https://travel-planner123.herokuapp.com/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('https://travel-planner123.herokuapp.com/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h2>Logged Vacation Plans</h2>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Destination</th>
              <th>Transportation</th>
              <th>Hotel/Housing</th>
              <th>Number of Passengers</th>
              <th>Number of Days</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}


