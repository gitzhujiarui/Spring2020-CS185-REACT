import React, { Component } from 'react';
import universe from './images/universe.jpeg'

export class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Welcome to the universe</h1>
                </div>
                <div className="main-body">
                    <img src={universe} alt="universe" height="150" width="300"/>
                <div>
                    <p>
                        The universe is made up of matter and energy. Visible, or normal matter, makes up everything we can touch and see, including ourselves, dogs, trees, planets, and stars. In the last 20 years we’ve discovered that this makes up less than 20% of the total mass of the universe. All the rest of the mass appears to be made of an invisible substance called dark matter. It emits and absorbs no light, but we can observe its gravitational effect on normal matter. Dark matter holds together the collections of stars called galaxies, and determines where galaxies gather together in clusters and filaments. A newer discovery is dark energy, a mysterious pressure that is actually overcoming gravity and causing the expansion of the universe to accelerate.
                    </p>
                </div>
            </div>
            </div>
        );
    }
}
export default Home;