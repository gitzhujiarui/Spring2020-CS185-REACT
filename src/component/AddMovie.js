import React, { Component } from 'react';
import config from './config.js';
const axios = require('axios');
const firebase = require('firebase')

export class AddMovie extends Component {
  constructor(props) {
    super();
    this.state = {
      movId: '',
      Poster: '',
      Title: '',
      Director: '',
      imdbRating: '',
      Plot: '',
      Runtime: '',
      Metascore: '',
    }
  }

  getMovieInfo(obj, req) {
    axios.get(req)
    .then(function (response) {
      obj.setState({
        Poster: response.data.Poster,
        Title: response.data.Title,
        Director: response.data.Director,
        imdbRating: response.data.imdbRating,
        Plot: response.data.Plot,
        Runtime: response.data.Runtime,
        Metascore: response.data.Metascore,
      });
    })
    .then(function () {
      obj.updateDb(obj);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  componentDidMount(){
    document.title = 'Add a Movie';
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  myFormHandler = (event) => {
    event.preventDefault();
    let req = 'https://www.omdbapi.com/?apikey=8ac22864&i='+this.state.movId;
    this.getMovieInfo(this, req);
  }

  inputHandler = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({[field]: value});
  }

  updateDb(obj) {
    let formObj = {
      Title: obj.state.Title,
      Poster: obj.state.Poster,
      Director: obj.state.Director,
      imdbRating: obj.state.imdbRating,
      Plot: obj.state.Plot,
      Runtime: obj.state.Runtime,
      Metascore: obj.state.Metascore,
    };
    let ref = firebase.database().ref('movies');
    ref.once('value').then(function(snapshot) {
      let movExists = snapshot.child(obj.state.movId).exists();
      if(movExists) {
        alert('Movie has already been added. Duplicate is not allowed.');
      } else {
        ref.child(obj.state.movId).set(formObj);
        alert('Movie successfully added!');
      }
    });
  }


  render() {
    return(
      <div>
        <form onSubmit={this.myFormHandler}>
          <h2>Add New Movie</h2>
          <p>Enter movie ID(imdbID)</p>
          <input name='movId' type='text' size='60' required onChange={this.inputHandler}></input><br/><br/>
          <input type='submit' size='80' id='submit' name='submit' value='submit'></input>
        </form>
      </div>      
    );
  }
}
export default AddMovie;