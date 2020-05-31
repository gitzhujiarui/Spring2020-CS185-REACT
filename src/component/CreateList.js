import React, { Component } from 'react';
import config from './config.js';
const firebase = require('firebase')

export class CreateList extends Component {
  constructor(props) {
    super();
    this.state = {
      newListName: '',
    }
  }

  componentDidMount(){
    document.title = 'Create a Movie List';
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  myChangeHandler = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({[field]: value});
  }

  myFormHandler = (event) => {
    event.preventDefault();
    let myObj = {
      name: this.state.newListName, 
    };
    firebase.database().ref('lists').push().set(myObj);
    //this.setState({shouldUpdate: true});
    alert("List successfully created!");
  }

  render() {
    return(
      <div>
        <form onSubmit={this.myFormHandler}>
          <h2>Create New Movie List</h2>
          <p>Enter a title for your movie list you want to create:</p>
          <input name='newListName' type='text' size='50' required onChange={this.myChangeHandler}></input><br/><br/>
          <input type='submit' id='submit' name='submit' value='Create New List'></input>
        </form>
      </div>       
    );
  }
}
export default CreateList;