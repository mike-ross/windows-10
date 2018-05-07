import React, { Component } from 'react';
import ColoredScrollbars from './ColoredScrollbars'

export default class Sidebar extends Component {
	render() {
		return (
			<ColoredScrollbars
				style={{
					display: 'block',
					position: 'absolute',
					top: 0,
					right: this.props.sidebarVisible ? 0 : -300,
					bottom: 0,
					width: 300,
					gridColumnEnd: -1,
					transition: this.props.sidebarVisible ? 'right 200ms ease-out' : 'right 100ms ease-out',
					zIndex: 10001
				}}
				id="sidebar" >
			</ColoredScrollbars>
		);
	}
}
