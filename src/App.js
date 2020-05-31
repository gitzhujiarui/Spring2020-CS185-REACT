import React, { Component } from 'react';
import './App.css'
import TabList from './component/TabList';
import Body from './component/Body';
import SimpleReactLightbox from 'simple-react-lightbox';
import ScrollUpButton from "react-scroll-up-button";
const firebase = require('firebase')


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
      },
      {
        id: 5,
        title: 'Message'
      },
      {
        id: 6,
        title: 'Movies'
      },
      {
        id: 7,
        title: 'AddMovie'
      },
      {
        id: 8,
        title: 'CreateList'
      }
    ]
    return (
      <SimpleReactLightbox>
        <div className="body">
          <ScrollUpButton />
          <div className="nav-bar">
            <TabList tabs={tabs}
            changeTab={this.changeTab} 
            activeTab={this.state.activeTab}/>
          </div>
          <div className="main-body">
            <Body activeTab={this.state.activeTab}/>
          </div>
        </div>
      </SimpleReactLightbox>
    );
  }
}
export default App;