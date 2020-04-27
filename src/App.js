import React, { Component } from 'react';
import './App.css'
import TabList from './component/TabList';
import Body from './component/Body';
// import black_hole from './images/black_hole.jpg'
// import darkenergy from './images/darkenergy.jpg'
// import galaxy from './images/galaxy.jpg'
// import gravitational_wave from './images/gravitational_wave.jpeg'
// import massive_black_holes from './images/massive_black_holes.jpg'
// import universe_2 from './images/universe_2.jpeg'
// import universe_3 from './images/universe_3.jpg'
// import galaxy_2 from './images/galaxy_2.jpeg'
// import universe_4 from './images/universe_4.jpg'

export class App extends Component {
  constructor(){
    super();
    this.state = {
      activeTab: 1
    }
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
  }
  render() {
    const tabs = [
      {
        id: 1,
        title: 'Home'
      },
      {
        id: 2,
        title: 'Images'
      },
      {
        id: 3,
        title: 'Videos'
      },
      {
        id: 4,
        title: 'Projects'
      }
    ]
    return (
      <div className="body">
        <div className="nav-bar">
          <TabList tabs={tabs}
          changeTab={this.changeTab} 
          activeTab={this.state.activeTab}/>
        </div>
        <div className="main-body">
          <Body activeTab={this.state.activeTab}/>
        </div>
      </div>
    );
  }
}
export default App;