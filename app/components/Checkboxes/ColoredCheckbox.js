/** @jsx React.DOM */
var React = require('flux-react');
	
var ColoredCheckbox = React.createClass({
	render: function() {
		var style = {
			backgroundColor: this.props.color,
			padding: '5px'
		};
		return (
			<span key={this.props.key} style={style}>
				<input type="checkbox" 
					onChange={this.props.onChange.bind(null, this.props.color)}
					checked={this.props.checked}/>
			</span>
		);
	}
	
});
	
module.exports = ColoredCheckbox;
