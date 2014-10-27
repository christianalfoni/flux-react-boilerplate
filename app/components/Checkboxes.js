/** @jsx React.DOM */
var React = require('react');
var flux = require('flux-react');
var actions = require('./../actions.js');
var ColoredCheckbox = require('./Checkboxes/ColoredCheckbox.js');
var CheckboxStore = require('../stores/CheckboxStore.js');

var Checkboxes = React.createClass({
	stores: [CheckboxStore],
	getInitialState: function () {
		return {
			checkboxes: CheckboxStore.getCheckboxes()
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
			checkboxes: CheckboxStore.getCheckboxes()
		});
	},
	check: function (color) {
		actions.check(color);
	},
	checkAll: function () {
		actions.checkAll();
	},
	uncheckAll: function () {
		actions.uncheckAll();
	},
	renderCheckbox: function (checkbox, index) {
		return <ColoredCheckbox 
						key={index} 
						color={checkbox.color} 
						checked={checkbox.checked} 
						onChange={this.check}/>
	},
	render: function() {
		var checkboxes = this.state.checkboxes.map(this.renderCheckbox);
		return (
			<div>
				<div>
					{checkboxes}
				</div>
				<div>
					<button onClick={this.checkAll}>Check all</button>
					<button onClick={this.uncheckAll}>Uncheck all</button>
				</div>
			</div>
		);
	}
	
});
	
module.exports = Checkboxes;
