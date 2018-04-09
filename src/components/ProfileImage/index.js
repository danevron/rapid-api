import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../../ItemTypes';
import flow from 'lodash/flow';
import './index.css';

const imageSource = {
	beginDrag(props) {
		const { left, top } = props;
		return { left, top };
	}
}

class ProfileImage extends Component {
  render() {
    const { top, left, connectDragSource } = this.props;

    return connectDragSource((
      <img
        className='profile-image'
        style={{ left, top }}
        alt='profileImage'
        src='https://gp3.googleusercontent.com/-f9rBh5MpBYc/AAAAAAAAAAI/AAAAAAAApjQ/pVlhOUoTkHE/s48-p-no/photo.jpg' />
    ));
  }
}

export default flow(
  DragSource(ItemTypes.IMAGE, imageSource, (connect, monitor) => ({
  	connectDragSource: connect.dragSource()
  }))
)(ProfileImage);
