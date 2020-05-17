import React, { Component } from 'react';
import Popup from "reactjs-popup";
import axios from 'axios';
import MovieCard from "./MovieZoomIn.js";
// import darkenergy from './images/darkenergy.jpg'
import { SRLWrapper } from "simple-react-lightbox";
import "./movie.css";

class Movie extends React.Component {
    state = {
        moviesList: ['tt4912910',
        'tt0419887',
        'tt0119217',
        'tt0268978',
        'tt4154796',
        'tt0815236',
        'tt0092099',
        'tt0371746'],
        searchTerm: ''
    };

    requestMovieInfo = event => {
        event.preventDefault();
        axios
            .get(
                `https://www.omdbapi.com/?apikey=623ad784&s=${this.state.searchTerm}`
            )
            .then(res => res.data)
            .then(res => {
                if (!res.requestMovieInfo) {
                    this.setState({ moviesList: [] });
                    return;
                }
                const moviesList = res.requestMovieInfo.map(movie => movie.imdbID);
                this.setState({
                    moviesList
                });
            });
    };

    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        });
    };

    dimPoster(e) {
        e.target.style.opacity = 0.6;
      }
    
      resetPoster(e) {
        e.target.style.opacity = 1;
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
          });
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
      }



    render() {
        const { moviesList } = this.state;

        return (
            <div class="movieCard">
                {/* <SRLWrapper> */}
                    <div>
                        <Popup
                            trigger={<img class = "myMovie" src={require("./moviePosters/mission_impossible.jpg")} onMouseEnter={this.dimPoster} onMouseLeave={this.resetPoster} width = "50%"></img>}
                            modal
                        >
                            <span>
                                <img src={require("./moviePosters/mission_impossible.jpg")} width = "20%"></img> 
                                <div className="stop-scrolling">
                                    <MovieCard movieID={'tt4912910'} key={'tt4912910'} />
                                </div>
                            </span>
                        </Popup>
                    </div>
                    <div>
                    <Popup
                            trigger={<img class = "myMovie" src={require("./moviePosters/the_kite_runner.jpg")} onMouseEnter={this.dimPoster} onMouseLeave={this.resetPoster} width = "50%"></img>}
                            modal
                        >
                            <span>
                                <img src={require("./moviePosters/the_kite_runner.jpg")} width = "20%"></img> 
                                <div>
                                    <MovieCard movieID={'tt0419887'} key={'tt0419887'} />
                                </div>
                            </span>
                    </Popup>
                    </div>
                    <div>
                    <Popup
                            trigger={<img class = "myMovie" src={require("./moviePosters/good_will_hunting.jpg")} onMouseEnter={this.dimPoster} onMouseLeave={this.resetPoster} width = "50%"></img>}
                            modal
                        >
                            <span>
                                <img src={require("./moviePosters/good_will_hunting.jpg")} width = "20%"></img> 
                                <div>
                                    <MovieCard movieID={'tt0119217'} key={'tt0119217'} />
                                </div>
                            </span>
                    </Popup>  
                    </div>
                    <div>
                    <Popup
                            trigger={<img class = "myMovie" src={require("./moviePosters/beautiful_mind.jpg")} onMouseEnter={this.dimPoster} onMouseLeave={this.resetPoster} width = "50%"></img>}
                            modal
                        >
                            <span>
                                <img src={require("./moviePosters/beautiful_mind.jpg")}  width = "20%"></img> 
                                <div>
                                    <MovieCard movieID={'tt0268978'} key={'tt0268978'} />
                                </div>
                            </span>
                    </Popup>  
                    </div>
                    <div>
                    <Popup
                            trigger={<img class = "myMovie" src={require("./moviePosters/avengers.jpg")} onMouseEnter={this.dimPoster} onMouseLeave={this.resetPoster} width = "50%"></img>}
                            modal
                        >
                            <span>
                                <img src={require("./moviePosters/avengers.jpg")}  width = "20%"></img> 
                                <div>
                                    <MovieCard movieID={'tt4154796'} key={'tt4154796'} />
                                </div>
                            </span>
                    </Popup> 
                    </div>
                    <div>
                    <Popup
                            trigger={<img  class = "myMovie" src={require("./moviePosters/league.jpg")} onMouseEnter={this.dimPoster} onMouseLeave={this.resetPoster} width = "50%"></img>}
                            modal
                        >
                            <span>
                                <img src={require("./moviePosters/league.jpg")}  width = "20%"></img> 
                                <div>
                                    <MovieCard movieID={'tt0815236'} key={'tt0815236'} />
                                </div>
                            </span>
                    </Popup>  
                    </div>
                    <div>
                    <Popup
                            trigger={<img  class = "myMovie" src={require("./moviePosters/top_gun.jpg")} onMouseEnter={this.dimPoster} onMouseLeave={this.resetPoster} width = "50%"></img>}
                            modal
                        >
                            <span>
                                <img src={require("./moviePosters/top_gun.jpg")}  width = "20%"></img> 
                                <div>
                                    <MovieCard movieID={'tt0092099'} key={'tt0092099'} />
                                </div>
                            </span>
                    </Popup>     
                    </div>
                    <div>
                    <Popup
                            trigger={<img  class = "myMovie" src={require("./moviePosters/iron_man.jpg")} onMouseEnter={this.dimPoster} onMouseLeave={this.resetPoster} width = "50%"></img>}
                            modal
                        >
                            <span>
                                <img src={require("./moviePosters/iron_man.jpg")}   width = "20%"></img> 
                                <div>
                                    <MovieCard movieID={'tt0371746'} key={'tt0371746'} />
                                </div>
                            </span>
                    </Popup>   
                    </div> 
                    {/* </SRLWrapper> */}
            </div>
        );
    }
}
export default Movie;