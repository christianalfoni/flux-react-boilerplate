/** @jsx React.DOM */
var React = require('flux-react');
var Checkboxes = require('./components/Checkboxes.js');
var NameThrower = require('./components/NameThrower.js');
	
var App = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Hello world!</h1>
				<Checkboxes/>
				<NameThrower/>
			</div>
		);
	}
});
	
module.exports = App;
