import React, { Component } from 'react';
import project_1 from './images/project_1.jpg'
import project_2 from './images/project_2.jpg'
import project_3 from './images/project_3.jpg'
import project_4 from './images/project_4.jpg'

export class Projects extends Component {
    render() {
        const projectstyle = {
            display: "content",
        };
        const projectelement = {
            display: 'flex',
            alignItems: 'center',
        };
        return (
            <div style={projectstyle}>
                <div style={projectelement}>
                    <div>
                        <img src={project_1} alt={project_1} height="350" width="500"/>
                    </div>
                    <div>
                        <a href="https://www.livescience.com/65384-cosmology.html">Cosmology: Uncovering the Story of the Universe</a>
                    </div>
                </div>
                <div style={projectelement}>
                    <div>
                        <img src={project_2} alt={project_2} height="350" width="500"/>
                    </div>
                    <div>
                    <a href="https://www.sciencenews.org/article/universe-expansion-rate-mystery">The universe's expansion rate is still a mystery</a>
                    </div>
                </div>
                <div style={projectelement}>
                    <div>
                        <img src={project_3} alt={project_3} height="350" width="500"/>
                    </div>
                    <div>
                    <a href="https://www.nbcnews.com/mach/science/cosmic-hotspots-may-be-evidence-universe-existed-ours-ncna909646">Cosmic 'hotspots' may be relics of a universe that existed before ours</a>
                    </div>
                </div>
                <div style={projectelement}>
                    <div>
                        <img src={project_4} alt={project_4} height="350" width="500"/>
                    </div>
                    <div>
                    <a href="https://www.sciencenews.org/article/supernova-show-universe-expands-same-rate-all-directions">The universe expands same rate all directions</a>
                    </div>
                </div>
            </div>
        );
    }
}
export default Projects;