import React, { Component } from 'react';
import './App.css';

import MainWindow from './includes/MainWindow'
import Sidebar from './includes/Sidebar'
import Taskbar from './includes/Taskbar'

class App extends Component {
	constructor() {
		super()
		this.state = {
			sidebarVisible: false,
			openWindows: [],
			windowOrder: [],
			desktopActive: true
		}
		this.nextId = this.nextId.bind(this)
		this.newWindow = this.newWindow.bind(this)
		this.setActive = this.setActive.bind(this)
		this.unsetActive = this.unsetActive.bind(this)
		this.minimiseWindow = this.minimiseWindow.bind(this)
		this.closeWindow = this.closeWindow.bind(this)
		this.showSidebar = this.showSidebar.bind(this)
		this.hideSidebar = this.hideSidebar.bind(this)
	}
	nextId() {
		this.uniqueId = this.uniqueId || 0
		return this.uniqueId++
	}
	newWindow(name, content) {
		let newId = this.nextId()
		this.setState((state, props) => ({
			openWindows: [...state.openWindows, {
				id: newId,
				name: name,
				minimised: false,
				content: content || 'Currently unavailable'
			}],
			windowOrder: [...state.windowOrder, newId]
		}));
	}
	setActive(i) {
		this.setState((state, props) => ({
			desktopActive: false,
			windowOrder: [...state.windowOrder.filter(activeWindow => activeWindow !== i), i],
			openWindows: state.openWindows.map(
				openWindow => (openWindow.id !== i) ? openWindow : {...openWindow, minimised: false}
			)
		}));
	}
	unsetActive() {
		this.setState((state, props) => ({
			desktopActive: true,
		}));
	}
	minimiseWindow(i) {
		this.setState((state, props) => ({
			openWindows: state.openWindows.map(
				openWindow => (openWindow.id !== i) ? openWindow : {...openWindow, minimised: true}
			),
			windowOrder: [i, ...state.windowOrder.filter(activeWindow => activeWindow !== i)]
		}));
	}
	closeWindow(i) {
		this.setState((state, props) => ({
			openWindows: state.openWindows.filter(openWindow => openWindow.id !== i),
			windowOrder: state.windowOrder.filter(activeWindow => activeWindow !== i)
		}));
	}
	showSidebar() {
		this.setState((state, props) => ({
			sidebarVisible: !state.sidebarVisible
		}));
	}
	hideSidebar() {
		this.setState((state, props) => ({
			sidebarVisible: false
		}));
	}
	componentWillMount() {
		this.newWindow('System Preferences')
	}
	componentDidMount() {
		this.newWindow('Host Update')
	}
	render() {
		return (
			<div className="App" >
				<div id="main-window"
					onClick={this.unsetActive} >
					<MainWindow
						openWindows={this.state.openWindows}
						windowOrder={this.state.windowOrder}
						desktopActive={this.state.desktopActive}
						minimiseWindow={this.minimiseWindow}
						closeWindow={this.closeWindow}
						setActive={this.setActive} />
					<Sidebar
						tabIndex="0"
						sidebarVisible={this.state.sidebarVisible}
						hideSidebar={this.hideSidebar} />
					<div id="sidebar-exit"
						style={{
							display: this.state.sidebarVisible ? 'block' : 'none',
							position: 'absolute',
							top: 0,
							left: 0,
							right: 300,
							bottom: 0,
							zIndex: 1000,
						}}
						onClick={this.hideSidebar} ></div>
				</div>
				<Taskbar
					newWindow={this.newWindow}
					openWindows={this.state.openWindows}
					windowOrder={this.state.windowOrder}
					desktopActive={this.state.desktopActive}
					showSidebar={this.showSidebar}
					setActive={this.setActive} />
			</div>
		);
	}
}

export default App;
