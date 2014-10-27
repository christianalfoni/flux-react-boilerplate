/** @jsx React.DOM */
var React = require('react');
var flux = require('flux-react');
var App = require('./App.js');

flux.debug();

React.renderComponent(<App/>, document.body);