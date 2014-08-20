/** @jsx React.DOM */
var React = require('flux-react');
var Constants = require('../Constants.js');
var CheckboxStore = require('../stores/CheckboxStore.js');
	
var NameThrower = React.createClass({
	stores: [CheckboxStore],
	getInitialState: function () {
		return {
			name: '',
			colors: CheckboxStore.getColors()
		};
	},
	storesDidUpdate: function () {
		this.setState({
			colors: CheckboxStore.getColors()
		});
	},
	updateName: function () {
		this.setState({
			name: this.refs.input.getDOMNode().value
		});
	},
	render: function() {
		var names = this.state.colors.map(function (color, index) {
			var style = {color: color};
			return <div key={index} style={style}>{this.state.name}</div>
		}, this);
		return (
			<div>
				<input ref="input" type="text" value={this.state.name} onChange={this.updateName}/>
				{names}
			</div>
		);
	}
	
});
	
module.exports = NameThrower;
