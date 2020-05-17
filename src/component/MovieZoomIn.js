import React, { Component } from 'react';

import axios from 'axios';
import "./MovieCard.css";

class MovieZoomIn extends React.Component {
    state = {
        movieInfo: {}
    };

    componentDidMount() {
        axios
            .get(
                `https://www.omdbapi.com/?apikey=623ad784&i=${this.props.movieID}`
            )
            .then(res => res.data)
            .then(res => {
                this.setState({ movieInfo: res });
            });
    }

    render() {
        const {
            Poster,
            Title,
            Director,
            imdbRating,
            Runtime,
            Plot,
            Metascore,
            } = this.state.movieInfo;

        return (
            <div className="movie-card">
                <div>
                        <div>
                            <h3>{Title}</h3>
                            <div>Director: {Director}</div>
                            <div>Time: {Runtime}</div>
                        </div>
                        <div>Rating: {imdbRating}</div>
                        <div className="Metascore">Metascore: {Metascore}</div>
                        <p>Description: {Plot && Plot.substr(0, 500)}</p>
                </div>
            </div>
        );
    }
}
export default MovieZoomIn;