import React, { Component } from 'react';
// import './videos.css'
// import Grid from 'react-css-grid'

export class Videos extends Component {
    render() {
        // const videostyle = {
        //     padding: "20px",
        //     display: "flex",
        //     // gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 2fr))',
        //     width: "100vw",
        //     // gridGap: '10px',
        //     // height: 0,
        //   };
        return (
            <div className="videos">
            <div>
            <iframe width="420" height="315" 
                src="https://www.youtube.com/embed/GoW8Tf7hTGA" 
                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>
            </div>
            <div>
            <iframe width="420" height="315"
                src="https://www.youtube.com/embed/tgbNymZ7vqY">
            </iframe>
            </div>
            <div>
            <iframe width="420" height="315" 
                src="https://www.youtube.com/embed/Iy7NzjCmUf0" 
                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>
            </div>
        </div>
        );
    }
}
export default Videos;