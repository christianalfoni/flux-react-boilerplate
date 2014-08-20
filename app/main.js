/** @jsx React.DOM */
var React = require('flux-react');
React.debug();

var App = require('./App.js');
React.renderComponent(<App/>, document.body);