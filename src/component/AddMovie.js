import React, { Component } from 'react';
import config from './config.js';
const axios = require('axios');
const firebase = require('firebase')

export class AddMovie extends Component {
  constructor(props) {
    super();
    this.state = {
      movId: '',
      title: '',
      imdb: '',
      src: '',
      metascore: '',
      plot: '',
      director: '',
      actors: '',
    }
  }

  componentDidMount(){
    document.title = 'Add new Movie';
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  updateDataBase(obj) {
    let formObj = {
      name: obj.state.title,
      imdb: obj.state.imdb,
      src: obj.state.src,
      plot: obj.state.plot,
      director: obj.state.director,
      actors: obj.state.actors,
    };
    let ref = firebase.database().ref('movies');
    ref.once('value').then(function(snapshot) {
      let movExists = snapshot.child(obj.state.movId).exists();
      if(movExists) {
        alert('Movie is already in the database. No duplicate allowed!');
      } else {
        ref.child(obj.state.movId).set(formObj);
        alert('Movie added!');
      }
    });
  }

  getMovieInfo(obj, req) {
    axios.get(req)
    .then(function (response) {
      obj.setState({
        src: response.data.Poster,
        director: response.data.Director,
        plot: response.data.Plot,
        title: response.data.Title,
        imdb: response.data.imdbRating,
        actors: response.data.Actors,
      });
    })
    .then(function () {
      obj.updateDataBase(obj);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  myFormHandler = (event) => {
    event.preventDefault();
    let req = 'https://www.omdbapi.com/?apikey=623ad784&i='+this.state.movId;
    this.getMovieInfo(this, req);
  }

  inputHandler = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({[field]: value});
  }

  render() {
    return(
      <div>
        <form onSubmit={this.myFormHandler}>
          <h2>Add New Movie</h2>
          <p>Enter the movie ID of the movie you want to add:</p>
          <input name='movId' type='text' size='30' required onChange={this.inputHandler}></input><br/><br/>
          <input type='submit' id='submit' name='submit' value='Add Movie'></input>
        </form>
      </div>      
    );
  }
}
export default AddMovie;