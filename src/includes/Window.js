import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWindowMinimize from '@fortawesome/fontawesome-free-regular/faWindowMinimize'
import faSquare from '@fortawesome/fontawesome-free-regular/faSquare'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'
import Draggable from 'react-draggable'

export default class Window extends Component {
	constructor() {
		super()

		this.state = {
			status: 'normal'
		}

		this.minimise = this.minimise.bind(this)
		this.maximise = this.maximise.bind(this)
		this.restore = this.restore.bind(this)
		this.close = this.close.bind(this)
		this.setActiveWindow = this.setActiveWindow.bind(this)
	}
	componentWillMount() {
		this.setActiveWindow()
	}
	minimise(e) {
		e.stopPropagation()
		this.props.minimiseWindow(this.props.index)
	}
	maximise(e) {
		e.stopPropagation()
		this.setState((state, props) => ({
			status: 'full'
		}));
	}
	restore(e) {
		e.stopPropagation()
		this.setState((state, props) => ({
			status: 'normal'
		}));
	}
	close(e) {
		e.stopPropagation()
		this.props.closeWindow(this.props.index)
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
					className={`window ${(this.props.minimised) ? 'window-minimised' : 'window-'+this.state.status} ${(this.props.active ? 'active' : '')}`}
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
							<button onClick={this.minimise}>
								<FontAwesomeIcon icon={faWindowMinimize} />
							</button>
							<button onClick={this.maximise}>
								<FontAwesomeIcon icon={faSquare} />
							</button>
							<button onClick={this.close}>
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
