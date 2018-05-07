import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'
import Draggable from 'react-draggable'

export default class Window extends Component {
	constructor() {
		super()

		this.close = this.close.bind(this)
		this.minimise = this.minimise.bind(this)
		this.setActiveWindow = this.setActiveWindow.bind(this)
	}
	componentWillMount() {
		this.setActiveWindow()
	}
	close() {
		this.props.closeWindow(this.props.index)
	}
	minimise() {
		console.log('closing', this.props.index)
	}
	setActiveWindow(e) {
		if(e) {
			e.stopPropagation()
		}
		this.props.setActive(this.props.index)
	}
	render() {
		return (
			<Draggable
				handle=".toolbar"
				bounds="#main-window"
				onStart={this.setActiveWindow} >
				<div
					className={'window' + (this.props.active ? ' active' : '')}
					style={{
						display: 'block',
						position: 'absolute',
						...this.props.style,
						transition: 'unset',
						zIndex: this.props.order
					}}
					onClick={this.setActiveWindow} >
					<div className="toolbar">
						<div className="window-title">{this.props.title}</div>
						<div className="button-group">
							<button className="close" onClick={this.close}>
								<FontAwesomeIcon icon={faTimes} />
							</button>
						</div>
					</div>
					<div className="window-content">
						{this.props.children}
					</div>
				</div>
			</Draggable>
		);
	}
}
