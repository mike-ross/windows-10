import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCommentAlt from '@fortawesome/fontawesome-free-regular/faCommentAlt'

import Clock from './Clock'

export default class Toolbar extends Component {
	render() {
		return (
			<div id="toolbar">
				<Clock />
				<button onClick={this.props.showSidebar}>
					<FontAwesomeIcon icon={faCommentAlt} />
				</button>
			</div>
		);
	}
}
