/** @jsx React.DOM */
var React = require('react');
var Checkboxes = require('./components/Checkboxes.js');
var NameThrower = require('./components/NameThrower.js');
	
var App = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Hello world!</h1>
				<div>
					<Checkboxes/>
				</div>
				<div>
					<NameThrower/>
				</div>
			</div>
		);
	}
});
	
module.exports = App;
