import React, { Component } from 'react';
import black_hole from './images/black_hole.jpg'
import darkenergy from './images/darkenergy.jpg'
import galaxy from './images/galaxy.jpg'
import gravitational_wave from './images/gravitational_wave.jpeg'
import massive_black_holes from './images/massive_black_holes.jpg'
import universe_2 from './images/universe_2.jpeg'
import universe_3 from './images/universe_3.jpg'
import galaxy_2 from './images/galaxy_2.jpeg'
import universe_4 from './images/universe_4.jpg'
import ImageList from './ImageList';
import { SRLWrapper } from "simple-react-lightbox";


export class Images extends Component {
    render() {
        const images = [{
            photo: black_hole,
            id: 1,
            title: "black_hole"
          },
          {
              photo: darkenergy,
              id: 2,
              title: "darkenergy"
          },
          {
              photo: galaxy,
              id: 3,
              title: "galaxy"
          },
          {
            photo: gravitational_wave,
            id: 4,
            title: "gravitational_wave"
        },
        {
            photo: massive_black_holes,
            id: 5,
            title: "massive_black_holes"
        },
        {
            photo: universe_2,
            id: 6,
            title: "universe_2"
        },
        {
            photo: universe_3,
            id: 7,
            title: "universe_3"
        },
        {
            photo: galaxy_2,
            id: 8,
            title: "galaxy_2"
        },
        {
            photo: universe_4,
            id: 9,
            title: "universe_4"
        },
        ]
        
        return (
            <div className="images-display">
                <SRLWrapper>
                    <ImageList images={images}/>
                </SRLWrapper>
            </div>
            // <div className="images-display">
            //      {/* <img src={black_hole} alt="black_hole" height="150" width="300"/>
            //      <img src={darkenergy} alt="darkenergy" height="150" width="300"/>
            //      <img src={galaxy} alt="galaxy" height="150" width="300"/>
            //      <img src={gravitational_wave} alt="gravitational_wave" height="150" width="300"/>
            //      <img src={massive_black_holes} alt="massive_black_holes" height="150" width="300"/>
            //      <img src={universe_2} alt="universe_2" height="150" width="300"/>
            //      <img src={universe_3} alt="universe_3" height="150" width="300"/>
            //      <img src={galaxy_2} alt="galaxy_2" height="150" width="300"/>
            //      <img src={universe_4} alt="universe_4" height="150" width="300"/> */}
            //  </div>    
        );
    }
}
export default Images;