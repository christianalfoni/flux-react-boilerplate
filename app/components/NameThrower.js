/** @jsx React.DOM */
var React = require('react');
var CheckboxStore = require('../stores/CheckboxStore.js');
	
var NameThrower = React.createClass({
	getInitialState: function () {
		return {
			name: '',
			colors: CheckboxStore.getColors()
		};
	},
	componentWillMount: function () {
		CheckboxStore.addChangeListener(this.update);
	},
	componentWillUnmount: function () {
		CheckboxStore.removeChangeListener(this.update);
	},
	update: function () {
		this.setState({
			colors: CheckboxStore.getColors()
		});
	},
	updateName: function (event) {
		this.setState({
			name: event.target.value
		});
	},
	renderColors: function (color, index) {
			var style = {color: color};
			return <div key={index} style={style}>{this.state.name}</div>
	},
	render: function() {
		var names = this.state.colors.map(this.renderColors);
		return (
			<div>
				<div>
					<input type="text" value={this.state.name} onChange={this.updateName}/>
				</div>
				<div>
					{names}
				</div>
			</div>
		);
	}
	
});
	
module.exports = NameThrower;
