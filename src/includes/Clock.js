import React, { Component } from 'react';

export default class Clock extends Component {
	constructor() {
		super()
		this.state = {
			time: new Date().toLocaleString(undefined, { hour: 'numeric', minute: '2-digit' }),
			date: new Date().toLocaleString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })
		}
	}
	componentDidMount() {
		this.intervalID = setInterval(
			() => this.tick(),
			1000
		)
	}
	componentWillUnmount() {
		clearInterval(this.intervalID)
	}
	tick() {
		this.setState({
			time: new Date().toLocaleString(undefined, { hour: 'numeric', minute: '2-digit' }),
			date: new Date().toLocaleString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })
		})
	}
	render() {
		return (
			<div id="clock">
				<div className="time">{this.state.time}</div>
				<div className="date">{this.state.date}</div>
			</div>
		);
	}
}
