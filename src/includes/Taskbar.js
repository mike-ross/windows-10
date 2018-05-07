import React, { Component } from 'react';
import ColoredScrollbars from './ColoredScrollbars'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faGoogleDrive from '@fortawesome/fontawesome-free-brands/faGoogleDrive'

import Toolbar from './Toolbar'
import Tab from './Tab'

const style = {
	display: 'grid',
	gridTemplateColumns: '50px 1fr auto',
	gridTemplateRows: 40
}

export default class Taskbar extends Component {
	constructor() {
		super()

		this.eachWindow = this.eachWindow.bind(this)
		this.testWindow = this.testWindow.bind(this)
	}
	eachWindow(openWindow, i) {
		return (
			<Tab key={openWindow.id}
				index={openWindow.id}
				setActive={this.props.setActive}
				active={(!this.props.desktopActive && this.props.windowOrder.indexOf(openWindow.id) === this.props.windowOrder.length-1 ? true : false)} >
				{openWindow.name}
			</Tab>
		)
	}
	testWindow() {
		this.props.newWindow('Test')
	}
	render() {
		return (
			<div
				id="taskbar"
				style={style} >
				<button id="start"
					onClick={this.testWindow} >
					<FontAwesomeIcon icon={faGoogleDrive} style={{fontSize: '25px'}} />
				</button>
				<ColoredScrollbars>
					<div id="window-list">
						{this.props.openWindows.map(this.eachWindow)}
					</div>
				</ColoredScrollbars>
				<Toolbar
					showSidebar={this.props.showSidebar} />
			</div>
		);
	}
}
