import React, { Component } from 'react';
import config from './config.js';
import './Message.css'

const firebase = require('firebase')

export class Message extends Component {
    constructor(props) {
      super();
      this.state = {
        visibility: 'private',
        data: [],
        name: '',
        description: '',
        message: '',
        email: '',
        shouldUpdate: false, 
      }
    }
  
    componentDidMount(){
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
      let reference = firebase.database().ref('data');
      reference.on('value', snapshot => {
        let data = snapshot.val();
          let newData = [];
          let months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];
          for (let dataEntry in data) {
            let dd = new Date(data[dataEntry].date);
            let date = months[dd.getMonth()]+" "+dd.getDate()+", "+dd.getFullYear()+" ("+dd.getHours()+":"+dd.getMinutes()+":"+dd.getSeconds()+")";
            newData.push({
              id: dataEntry,
              visibility: data[dataEntry].visibility,
              name: data[dataEntry].name,
              description: data[dataEntry].description,
              message: data[dataEntry].message,
              email: data[dataEntry].email,
              date: date,
            })
          }
          this.setState({data: newData});
      })
    }
  
    componentDidUpdate(prevProps, prevState, snapshot){
      if(this.state.shouldUpdate !== prevState.shouldUpdate){
        let reference = firebase.database().ref('data');
        reference.on('value', snapshot => {
          let data = snapshot.val();
          let newData = [];
          let months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];
          for (let dataEntry in data) {
            let dd = new Date(data[dataEntry].date);
            let date = months[dd.getMonth()]+" "+dd.getDate()+", "+dd.getFullYear()+" ("+dd.getHours()+":"+dd.getMinutes()+":"+dd.getSeconds()+")";
            newData.push({
              id: dataEntry,
              visibility: data[dataEntry].visibility,
              name: data[dataEntry].name,
              description: data[dataEntry].description,
              message: data[dataEntry].message,
              email: data[dataEntry].email,
              date: date,
            })
          }
          this.setState({data: newData});
        })
      }
    }
  
    myFormHandler = (event) => {
      event.preventDefault();
      if (this.state.name == '') {
        alert("Name is a required field");
      } else if (this.state.message == '') {
        alert("Message is a required field");
      } 
       else {
        let myMessage = {
          name: this.state.name, 
          description: this.state.description,
          message: this.state.message,
          visibility: this.state.visibility,
          email: this.state.email,
          date: firebase.database.ServerValue.TIMESTAMP,
        };
        firebase.database().ref('data').push().set(myMessage);
        this.setState({shouldUpdate: true});
        alert("Message delivered.");
      }
    }
  
    myChangeHandler = (event) => {
      let field = event.target.name;
      let value = event.target.value;
      this.setState({[field]: value});
    }
  
    render() {
      return (
        <div>
          <div className='message'>
            <div className = 'message-display'>
              <div className='form-fade-in'>
                <form onSubmit={this.myFormHandler}>
                        <br></br>
                            <p>Name:&nbsp;
                            <input name='name' type='text' minLength='3' maxLength='19' required onChange={this.myChangeHandler} /></p>
                        <br></br>
                            <p>Description:<br/>
                            <input name='description' type='text' size='50' maxLength='99' onChange={this.myChangeHandler}/>
                        </p>              
                        <br></br>
                            <p> Message:<br/>
                            <textarea name='message' minLength='5' maxLength='499' required onChange={this.myChangeHandler}></textarea>
                        </p>
                        <br></br>
                            <p>Do you want your message to appear on my website?<br/>
                            <select id='visibility' name='visibility' required onChange={this.myChangeHandler}>
                                <option value='private'>No</option>
                                <option value='public'>Yes</option>
                            </select>
                        </p>
                        <br></br>
                            <p>Email:
                            <input name='email' type='text' size='30' onChange={this.myChangeHandler}/>
                            </p>
                        <br></br>
                            <div>
                            <input type='submit' id='submit' name='submit' value='Submit'></input>
                            </div>
                </form>
              </div>
  
              <div className='my-message'>
                <p>My Messages:</p>
                {this.state.data.map((dataEntry) => {
                  if(dataEntry.visibility !== 'private') {
                    if(dataEntry.description !== '') {
                      return (
                        <div className='my-message-fade-in' id={dataEntry.id}>
                            <div>
                                <span className='date'>{dataEntry.date}</span><br/>
                                <span className='name'>{dataEntry.name}</span><br/>
                                <span className='description'>{dataEntry.description}</span><br/>
                                <span className='message'>{dataEntry.message}</span><br/>
                                {/* <textarea className='date'>{dataEntry.date}</textarea><br/>
                                <textarea className='name'>{dataEntry.name}</textarea><br/>
                                <texarea className='description'>{dataEntry.description}</texarea><br/>
                                <textarea className='message'>{dataEntry.message}</textarea><br/> */}
                                <br/>
                                <br/>
                            </div>
                        </div>
                      )
                    } else {
                      return (
                        <div className='my-message-fade-in' id={dataEntry.id}>
                            <span className='date'>{dataEntry.date}</span><br/>
                            <span className='name'>{dataEntry.name}</span><br/>
                            <span className='message'>{dataEntry.message}</span><br/>
                            <br/>
                            <br/>
                        </div>
                      )
                    }
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
export default Message;