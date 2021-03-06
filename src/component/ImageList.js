import React, { Component } from 'react';

export class ImageList extends Component {
    render() {
        const mystyle = {
            padding: "10px",
          };
        return this.props.images.map((image) => (
            <img style={mystyle} src={image.photo} alt={image.title} height="150" width="300"/>
        ));
    }
}
export default ImageList;