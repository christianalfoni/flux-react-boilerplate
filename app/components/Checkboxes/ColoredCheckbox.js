/** @jsx React.DOM */
var React = require('react');
	
var ColoredCheckbox = React.createClass({
	changeColor: function () {
		this.props.onChange(this.props.color);
	},
	render: function() {
		var style = {
			backgroundColor: this.props.color,
			padding: '5px'
		};
		return (
			<span key={this.props.key} style={style}>
				<input type="checkbox" 
					onChange={this.changeColor}
					checked={this.props.checked}/>
			</span>
		);
	}
	
});
	
module.exports = ColoredCheckbox;
