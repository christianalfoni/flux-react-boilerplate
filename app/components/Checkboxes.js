/** @jsx React.DOM */
var React = require('flux-react');
var Constants = require('../Constants.js');
var ColoredCheckbox = require('./Checkboxes/ColoredCheckbox.js');
var CheckboxActions = require('../actions/CheckboxActions.js');
var CheckboxStore = require('../stores/CheckboxStore.js');

var Checkboxes = React.createClass({
	stores: [CheckboxStore],
	getInitialState: function () {
		return {
			checkboxes: CheckboxStore.getCheckboxes()
		};
	},
	storesDidUpdate: function () {
		this.setState({
			checkboxes: CheckboxStore.getCheckboxes()
		});
	},
	check: function (color) {
		React.dispatch({
			type: CheckboxActions.CHECK,
			color: color
		})
	},
	checkAll: function () {
		React.dispatch({
			type: CheckboxActions.CHECK_ALL
		});
	},
	uncheckAll: function () {
		React.dispatch({
			type: CheckboxActions.UNCHECK_ALL
		});
	},
	render: function() {
		var checkboxes = this.state.checkboxes.map(function (checkbox, index) {
			return <ColoredCheckbox key={index} color={checkbox.color} checked={checkbox.checked} onChange={this.check}/>
		}, this);
		return (
			<div>
				{checkboxes}
				<button onClick={this.checkAll}>Check all</button>
				<button onClick={this.uncheckAll}>Uncheck all</button>
			</div>
		);
	}
	
});
	
module.exports = Checkboxes;
