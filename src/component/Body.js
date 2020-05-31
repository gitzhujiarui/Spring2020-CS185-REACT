import React, { Component } from 'react';
import Home from './Home';
import Images from './Images';
import Projects from './Projects';
import Videos from './Videos';
import Message from './Message';
import Movie from './Movie'
import AddMovie from './AddMovie'
import CreateList from './CreateList'

export class Body extends Component {
    displayContent = () => {
        var activeTab = this.props.activeTab
        if(activeTab == 1) {
            return <Home/>
        } else if (activeTab == 2) {
            return <Images/>
        } else  if (activeTab == 3){
            return <Videos/>
        } else if (activeTab == 4){
            return <Projects/>
        } else if (activeTab == 5){
            return <Message/>
        } else if (activeTab == 6){
            return <Movie/>
        } else if (activeTab == 7){
            return <AddMovie/>
        } else {
            return <CreateList/>
        }
    }

    render() {
        return (this.displayContent());
    }
}
export default Body;