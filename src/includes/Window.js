import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWindowMinimize from '@fortawesome/fontawesome-free-regular/faWindowMinimize'
import faWindowRestore from '@fortawesome/fontawesome-free-regular/faWindowRestore'
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
		this.startDrag = this.startDrag.bind(this)
		this.dragScreen = this.dragScreen.bind(this)
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
	startDrag(e) {
		this.setActiveWindow()
	}
	dragScreen(e) {
		if (this.state.status === 'full') {
			this.setState((state, props) => ({
				status: 'normal'
			}));
		}
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
				ref='draggable'
				handle=".toolbar"
				bounds="#main-window"
				defaultPosition={{
					x: 50 + this.props.index*10,
					y: 50 + this.props.index*10
				}}
				onStart={this.setActiveWindow}
				onDrag={this.dragScreen} >
				<div
					className={`window ${(this.props.minimised) ? 'window-minimised' : 'window-'+this.state.status} ${(this.props.active ? 'active' : '')}`}
					style={{
						display: 'block',
						position: 'absolute',
						top: 0,
						left: 0,
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
							{(this.state.status === 'normal') ?
								<button onClick={this.maximise}>
									<FontAwesomeIcon icon={faSquare} />
								</button>
								:
								<button onClick={this.restore}>
									<FontAwesomeIcon icon={faWindowRestore} />
								</button>
							}
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
