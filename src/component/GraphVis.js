import React, { Component } from 'react';
import config from './config.js';
const firebase = require('firebase')
var d3 = require('d3');

var divStyle = {
    width:  1440,
};

let data = {
  nodes: [],
  links: [],
}

let actorsArray = [];

export class GraphVis extends Component {
  constructor(props) {
    super();
    this.state = {
      GraphVisMovInfo: {},
    }
  }

  // get data from firebase
  componentDidMount(){
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    let relationList = firebase.database().ref('relations');
    let GraphVisMovies = [];
    relationList.once('value').then(snapshot => {
      let movies = snapshot.val();
      for (let i in movies) {
        if(movies[i].list == 'GraphViz') {
          GraphVisMovies.push(movies[i].mov);
        }
      }
    });
    console.log(GraphVisMovies);


    let moviesList = firebase.database().ref('movies');
    let GraphVisMovInfo = [];
    moviesList.once('value').then(snapshot => {
      let moviesInList = snapshot.val();
      console.log(moviesInList);
      for (let j in moviesInList) {
          console.log(GraphVisMovies.indexOf(j));

        if (GraphVisMovies.indexOf(j) > -1) { // check if it is in the GraphVis List
          GraphVisMovInfo.push({
            id:  j,
            src:  moviesInList[j].src,
            name:  moviesInList[j].name,
            actors: moviesInList[j].actors,
          })
        }
      }

      let node_id = 0;                  // assign each node an ID
      for(let k in GraphVisMovInfo) {
      // create the movie nodes
        let movie_node = {
          id: node_id,
          node_type: 'movie',
          src: GraphVisMovInfo[k].src,
          name: GraphVisMovInfo[k].name,
        }
        data.nodes.push(movie_node);
        node_id++;

        let actors_list = GraphVisMovInfo[k].actors.split(', ');
        for(let l in actors_list) {
          let actor_node = {
            node_type: 'actor',
            name: actors_list[l],
            id: node_id,
          }
          node_id++;
       
          if(!this.checkActorDuplicate(actorsArray, actors_list[l])) {
            console.log(this.checkActorDuplicate(actorsArray, actors_list[l]));
            data.nodes.push(actor_node);
            actorsArray.push(actors_list[l]);
          }
          
          let link = {
            target: actors_list[l],
            source: GraphVisMovInfo[k].name,
            value: 1,
          }
          data.links.push(link);
        }
      }



      const elem = document.getElementById('svg');
      elem.appendChild(this.chart(data.nodes, data.links));


    });
  }

  drag = (simulation) => {
    function dragStarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.5).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragEnded(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return d3.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded);
   }

  chart(nodes, links) {
    const width = 1440;
    const height = 900;

    const obj_links = links.map(d => Object.create(d));
    const obj_nodes = nodes.map(d => Object.create(d));

    const svg = d3.create('svg').attr('viewBox', [0, 0, width, height]);

    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(obj_links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value));

    // const color = (node) => {
    //     if (node.group == 1)
    //         return d3.color("blue");
    //     else
    //         return d3.color("pink");
    // }

    const radius = (node) => {
      if(node.node_type === 'movie') {
        return 100;
      } else {
        return 30;
      }
    }

    const getPosterURL = (node) => {
      if(node.node_type == 'movie') {
        return node.src;
      }
    }

   
    const simulation = d3.forceSimulation(obj_nodes)
      .force('link', d3.forceLink().links(obj_links).id(d => { return d.name; }).distance(200))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));


    let tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')



    // var defs = svg.append("defs");
    // const movieNodeBackGround = (node) => {
    //     var defs = svg.append("defs");
    //     if (node.node_type == "movie") {
    //         defs.append('pattern')
    //             .attr('id', 'img_'+node.id)
    //             .attr('patternUnits', 'objectBoundingBox')
    //             .attr('width', 1)
    //             .attr('height', 1)
    //             .append('image')
    //             .attr('xlink:href', getPosterURL(node))
    //

    //         console.log(getPosterURL(node));
    //         return "url(#img_" + node.node_id + ")"
    //     }
    //     return d3.color("blue")
    // }

    svg.append('defs')
      .selectAll('pattern')
      .data(obj_nodes)
      .enter()
      .append("pattern")
      .attr('id', function(movie_node) {
        return 'id-' + movie_node.id;
      })
      .attr('patternUnits', 'objectBoundingBox')
      .attr('width', 1)
      .attr('height', 1)
      .append('image')
      .attr('xlink:href', getPosterURL);

    var mouseOn = function(node) {
        tooltip.style("opacity", 1)
        d3.select(this)
    }

    var mouseHov = function(node) {
        if (node.node_type === 'actor') {
            tooltip.text(node.name)
                    .style("left", (d3.mouse(this)[0] - 5) + "px")
                    .style("top", (d3.mouse(this)[1] + 5) + "px")
        }
    }

    var mouseLeave = function(node) {
        if (node.node_type === 'actor') {
            tooltip
            .style("opacity", 0)
            d3.select(this)
            .style("stroke", "white")
        }
    }


    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-opacity', 1.5)
      .selectAll('circle')
      .data(obj_nodes)
      .join('circle')
      .attr('r', radius)
      .style('fill', function(movie_node) { 
        if(movie_node.node_type == 'movie') {
          return ("url(#id-" + movie_node.id + ")");
        }
        return d3.color('blue');
      })
      .on("mouseover", mouseOn)
      .on("mousemove", mouseHov)
      .on("mouseleave", mouseLeave)
      .call(this.drag(simulation))


    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    return svg.node();
  }

  checkActorDuplicate(actorsArray, actor) {
      if (actorsArray.indexOf(actor) > -1) {
          return true;
      } else {
          return false;
      }
  }

  render() {
    return(
      <div id='svg' style={divStyle}>
        </div>      
    );
  }
}
export default GraphVis;