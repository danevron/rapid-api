import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../../ItemTypes';
import flow from 'lodash/flow';

import ProfileImage from '../ProfileImage';
import './index.css';

const imageTarget = {
	drop(props, monitor, component) {
		const item = monitor.getItem();
		const delta = monitor.getDifferenceFromInitialOffset();
		const left = Math.round(item.left + delta.x);
		const top = Math.round(item.top + delta.y);

		component.props.onLocationChange(top, left);
	}
}

class Home extends Component {
  render() {
    const { connectDropTarget } = this.props;
    const { top, left } = this.props.user.profile_image_location;

    return connectDropTarget((
      <div className='drop-target'>
        <ProfileImage top={top} left={left} />
      </div>
    ));
  }
}

export default flow(
  DropTarget(ItemTypes.IMAGE, imageTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Home);
