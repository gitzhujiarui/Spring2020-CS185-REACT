// this pa is done in callaboration with Leo Lin and some help from the internet
import React, { Component } from 'react';
import MovieGallery from './MovieGallery';
import config from './config.js';
import './Movies.css'
const firebase = require('firebase');


export class Movies extends Component {
  constructor(props) {
    super();
    this.state = {
      lists: [],
      movies: [],
      displayButton: 'none',
      currPoint: '',
      lastMov: '',
      listChoice: 'all',
      shouldUpdate: false,
    }
  }

  searchMovies() {
    let movChoice = document.getElementById('search').value.toLowerCase();
    let ref = firebase.database().ref('movies');
    ref.once('value').then(snapshot => {
      let movies = snapshot.val();
        let newData = [];
        for (let entry in movies) {
          let title = (movies[entry].name).toLowerCase();
          if (title.includes(movChoice)) {
            newData.push({
              id:  entry,
              name:  movies[entry].name,
              src:  movies[entry].src,
              imdb:  movies[entry].imdb,
              plot:  movies[entry].plot,
              director:  movies[entry].director,
            })
          }
        }
        this.setState({displayButton: 'none'});
        this.setState({movies: newData});
    })
  }

  enlarge(imgSrc, title, director, rating, plot, idVal) {
    document.body.style.overflow = 'hidden';
    var lbContent = document.createElement('img');
    lbContent.className = 'movLightboxContent';
    lbContent.src = imgSrc;
    lbContent.id = 'lbContent';

    var lbInfo = document.createElement('div');
    lbInfo.className = 'movLightboxInfo';
    lbInfo.id = 'lbInfo';
    lbInfo.innerHTML = '<span class=\'title\'>'+title+'</span><br/><span class=\'director\'>'+director+'</span><br/><br/><span class=\'rating\'>IMDb Rating: '+rating+'</span><p>'+plot+'</p>';

    
    var lightbox = document.createElement('div');
    lightbox.id = 'lb';
    lightbox.className = 'movLightbox';

    var lbMovie = document.createElement('div');
    lbMovie.id = 'lbMovie';
    lbMovie.className = 'movLightboxContainer';

    var delButton = document.createElement('button');
    delButton.id = 'delButton';
    delButton.innerHTML = 'Delete Movie';
    delButton.onclick = function () {
      if(window.confirm('Confirm delete '+title+'?')) {
        let ref = firebase.database().ref('movies');
        ref.once('value').then(snapshot => {
          let movies = snapshot.val();
            for (let entry in movies) {
              if(entry == idVal) {
                firebase.database().ref('movies/'+entry).remove();
              }
            }
        })

        let refList = firebase.database().ref('relations');
        refList.once('value').then(snapshot => {
          let relations = snapshot.val();
            for (let entry in relations) {
              if(relations[entry].mov === idVal) {
                firebase.database().ref('relations/'+entry).remove();
              }
            }
        })
        document.getElementById('lb').removeChild(document.getElementById('lbMovie'));
        document.body.removeChild(document.getElementById('lb'));
        document.body.style.overflow = 'auto';
      }
    };

    var addList = document.createElement('select');
    addList.id = 'add-list';
    addList.style.marginTop = '12px';
    addList.name = 'addLists';
    let listRef = firebase.database().ref('lists');
    let otherLists = [];
    listRef.once('value').then(snapshot => {
      let lists = snapshot.val();
        for (let entry in lists) {
          otherLists.push(lists[entry].name);
        }
        let relRef = firebase.database().ref('relations');
        relRef.once('value').then(snapshot => {
          let rels = snapshot.val();
            for (let entry in rels) {
              if(rels[entry].mov === idVal) {
                let pos = otherLists.indexOf(rels[entry].list);
                otherLists.splice(pos, 1);
              }
            }
            var opt = document.createElement('option');
            opt.value = '';
            opt.innerHTML = 'Select List';
            opt.disabled = 'true';
            opt.selected = 'true';
            opt.hidden = 'true';
            addList.appendChild(opt);
            for(var i in otherLists) {
              opt = document.createElement('option');
              opt.value= otherLists[i];
              opt.innerHTML = otherLists[i]; 
              addList.appendChild(opt);
            }
        });
    });

    var listDiv = document.createElement('div');
    var listBtn = document.createElement('button');
    listBtn.id = 'listBtn';
    listBtn.innerHTML = 'Add to List';
    listDiv.appendChild(addList);
    listDiv.appendChild(listBtn);
    listBtn.onclick = function () {
      var choice = document.getElementById('add-list').value;
      if(choice.length === 0) {
        alert('No list selected.');
      } else {
        let formObj = {
          mov: idVal, 
          list: choice,
        };
        firebase.database().ref('relations').push().set(formObj);
        alert('Successfully added '+title+' to '+choice+' list.');
      }
    };
   
    document.body.appendChild(lightbox);  
    document.getElementById('lb').appendChild(lbMovie);
    document.getElementById('lbMovie').appendChild(lbContent);
    document.getElementById('lbMovie').appendChild(lbInfo);
    document.getElementById('lbInfo').appendChild(listDiv);
    document.getElementById('lbInfo').appendChild(delButton);
    document.getElementById('lb').addEventListener('click', function(event) {
      if(event.target.className === 'movLightbox') {
        document.getElementById('lb').removeChild(document.getElementById('lbMovie'));
        document.body.removeChild(document.getElementById('lb'));
        document.body.style.overflow = 'auto';
      }
    });
  }

  componentWillUnmount() {
    this.ref.off();
    this.listRef.off();
  }

  componentDidMount(){
    document.title = 'Great Movies';
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    this.ref = firebase.database().ref('movies');
    this.ref.on('value', snapshot => {
      let movies = snapshot.val();
        let newData = [];
        for (let entry in movies) {
          newData.push({
            id:  entry,
            name:  movies[entry].name,
            src:  movies[entry].src,
            director:  movies[entry].director,
            imdb:  movies[entry].imdb,
            plot:  movies[entry].plot,
          })
        }
        this.setState({lastMov: newData[newData.length-1]});
        if(newData.length < 9) {
          this.setState({displayButton: 'none'});
        } else {
          this.setState({displayButton: 'block'});
        }
    });

    let first = this.ref.orderByKey().limitToFirst(9);
    first.on('value', snapshot => {
      if(this.state.listChoice === 'all') {
        let firstMovs = snapshot.val();
        let currEight = [];
        for (let entry in firstMovs) {
          currEight.push({
            id:  entry,
            name:  firstMovs[entry].name,
            src:  firstMovs[entry].src,
            director:  firstMovs[entry].director,
            imdb:  firstMovs[entry].imdb,
            plot:  firstMovs[entry].plot,
          });
        }
        this.setState({currPoint: currEight[currEight.length-1].id});
        currEight.pop();
        this.setState({movies: currEight});
      } else {
        let movsInList = [];
        let ref = firebase.database().ref('relations');
        ref.once('value').then(snapshot => {
          let rels = snapshot.val();
          for (let entry in rels) {
            if(rels[entry].list === this.state.listChoice) {
              movsInList.push(rels[entry].mov);
            }
          }
          let movsRef = firebase.database().ref('movies');
          movsRef.once('value').then(snapshot => {
            let movies = snapshot.val();
            let newData = [];
            for (let entry in movies) {
              if (movsInList.includes(entry)) {
                newData.push({
                  id:  entry,
                  src:  movies[entry].src,
                  name:  movies[entry].name,
                  imdb:  movies[entry].imdb,
                  plot:  movies[entry].plot,
                  director:  movies[entry].director,
                })
              }
            }
            this.setState({movies: newData});
            this.setState({displayButton: 'none'});
          })
        })
      }
    });

    this.listRef = firebase.database().ref('lists');
    this.listRef.on('value', snapshot => {
      let lists = snapshot.val();
        let newData = [];
        for (let entry in lists) {
          newData.push(
            lists[entry].name
          )
        }
        this.setState({lists: newData});
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.state.shouldUpdate !== prevState.shouldUpdate){
      let ref = firebase.database().ref('movies');
      ref.on('value', snapshot => {
        let movies = snapshot.val();
          let newData = [];
          for (let entry in movies) {
            newData.push({
              id:  entry,
              src:  movies[entry].src,
              name:  movies[entry].name,
              imdb:  movies[entry].imdb,
              plot:  movies[entry].plot,
              director:  movies[entry].director,
            })
          }
          this.setState({lastMov: newData[newData.length-1]});
          if(newData.length < 9) {
            this.setState({displayButton: 'none'});
          } else {
            this.setState({displayButton: 'block'});
          }
      });
    }
  }

  LoadMoreMovies() {
    let ref = firebase.database().ref('movies');
    let tmp = ref.orderByKey().startAt(this.state.currPoint);
    let next = tmp.limitToFirst(9);
    next.on('value', snapshot => {
      let nextMovs = snapshot.val();
      let currEight = [];
      for (let entry in nextMovs) {
        currEight.push({
          id:  entry,
          name:  nextMovs[entry].name,
          src:  nextMovs[entry].src,
          imdb:  nextMovs[entry].imdb,
          plot:  nextMovs[entry].plot,
          director:  nextMovs[entry].director,
        });
      }
      if(currEight[currEight.length-1].id === this.state.lastMov.id && currEight.length <= 8) {
        this.setState({displayButton: 'none'});
      } else {
        this.setState({currPoint: currEight[currEight.length-1].id});
        currEight.pop();
      }
      let totalMovies = this.state.movies;
      totalMovies = totalMovies.concat(currEight);
      this.setState({movies: totalMovies});
    });
  }

  myChangeHandler = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({[field]: value});
    
    let listChoice = document.getElementById('list').value;
    if(listChoice === 'all') {
      let ref = firebase.database().ref('movies');
      ref.once('value').then(snapshot => {
        let movies = snapshot.val();
          let newData = [];
          for (let entry in movies) {
            newData.push({
              id:  entry,
              name:  movies[entry].name,
              src:  movies[entry].src,
              director:  movies[entry].director,
              imdb:  movies[entry].imdb,
              plot:  movies[entry].plot,
            })
          }
          this.setState({lastMov: newData[newData.length-1]});
          if(newData.length < 9) {
            this.setState({displayButton: 'none'});
          } else {
            this.setState({displayButton: 'block'});
          }
      });

    } else {
      let movsInList = [];
      let ref = firebase.database().ref('relations');
      ref.once('value').then(snapshot => {
        let rels = snapshot.val();
        for (let entry in rels) {
          if(rels[entry].list === listChoice) {
            movsInList.push(rels[entry].mov);
          }
        }
        let movsRef = firebase.database().ref('movies');
        movsRef.once('value').then(snapshot => {
          let movies = snapshot.val();
          let newData = [];
          for (let entry in movies) {
            if (movsInList.includes(entry)) {
              newData.push({
                id:  entry,
                name:  movies[entry].name,
                src:  movies[entry].src,
                director:  movies[entry].director,
                imdb:  movies[entry].imdb,
                plot:  movies[entry].plot,
              })
            }
          }
          this.setState({movies: newData});
          this.setState({displayButton: 'none'});
        })
      })
    }
  }
  
  render() {
    return (
      <div>
          <div>
          <div>
                <div id='listSwichButton'>
                <select name='listChoice' id='list' onChange={this.myChangeHandler}>
                <option value='all'>All Movies</option>
                {
                  this.state.lists.map((list) => (
                    <option value={list}>{list}</option>
                  ))
                }
              </select>
              </div>
            <div id='searchConfig'>
              <input type='text' name='search' id='search' />
              <button id='searchButton' onClick={this.searchMovies.bind(this)}>Search</button>
              </div>
              </div>
                <div>
                    <MovieGallery movieList={this.state.movies} enlarge={this.enlarge} />
                </div>

                <div style={{display: this.state.displayButton}}>
                  <button id='LoadMoreButton' onClick={this.LoadMoreMovies.bind(this)}>Load More Movies</button>
                </div>
        </div>
      </div>
    );
  }
}
export default Movies;