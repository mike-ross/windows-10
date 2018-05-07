import React, { Component } from 'react';

const style = {
		position: 'relative',
		flex: '1 1 auto',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: '100%',
		minWidth: 50,
		maxWidth: 200,
		paddingVertical: 5,
		paddingHorizontal: 10,
		textAlign: 'center'
}

export default class Tab extends Component {
	constructor() {
		super()

		this.setActiveTab = this.setActiveTab.bind(this)
	}
	setActiveTab() {
		this.props.setActive(this.props.index)
	}
	render() {
		return (
			<div
				style={style}
				className={'window' + (this.props.active ? ' active' : '')}
				tabIndex="0"
				onClick={this.setActiveTab} >
				{this.props.children}
			</div>
		);
	}
}
