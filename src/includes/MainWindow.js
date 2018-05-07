import React, { Component } from 'react';
import Window from './Window'

export default class MainWindow extends Component {
	constructor() {
		super()

		this.eachWindow = this.eachWindow.bind(this)
	}
	eachWindow(openWindow, i) {
		return (
			<Window key={openWindow.id}
				index={openWindow.id}
				title={openWindow.name}
				active={(!this.props.desktopActive && this.props.windowOrder.indexOf(openWindow.id) === this.props.windowOrder.length-1 ? true : false)}
				order={this.props.windowOrder.indexOf(openWindow.id)}
				minimiseWindow={this.props.minimiseWindow}
				minimised={openWindow.minimised}
				{...this.props} >
				{openWindow.content}
			</Window>
		)
	}
	render() {
		return (
			<div>
				{this.props.openWindows.map(this.eachWindow)}
			</div>
		);
	}
}
