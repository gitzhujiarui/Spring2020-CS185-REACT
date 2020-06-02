import React, { Component } from 'react';
const axios = require('axios');

export class Movie extends Component {
  constructor()
  {
    super();
    this.state = {
      src: '',
      title: '',
      director: '',
      imdb: '',
      plot: '',
    }
  }

  dimPoster(e) {
    e.target.style.opacity = 0.6;
  }

  resetPoster(e) {
    e.target.style.opacity = 1;
  }

  getMovieInfo(obj, req) {
    axios.get(req)
    .then(function (response) {
      console.log(response);
      obj.setState({
        src: response.data.Poster,
        title: response.data.Title,
        director: response.data.Director,
        imdb: response.data.imdbRating,
        plot: response.data.Plot,
      });
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    let req = 'https://www.omdbapi.com/?apikey=623ad784&i='+this.props.movie;
    return(
      <div className='mov-child'>
        {this.getMovieInfo(this, req)}
        <img src={this.state.src} onMouseEnter={this.dimPoster} onMouseLeave={this.resetPoster}
         onClick={this.props.enlarge.bind(this, this.state.src, this.state.title, this.state.director, this.state.imdb, this.state.plot)}
        alt={this.state.title}/>
        {/* <img src={this.state.src} onMouseEnter={this.dimPoster} onMouseLeave={this.resetPoster}
        alt={this.state.title}/> */}
      </div>      
    );
  }
}
export default Movie;