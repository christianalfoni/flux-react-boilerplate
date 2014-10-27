(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/main.js":[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var flux = require('flux-react');
var App = require('./App.js');

flux.debug();

React.renderComponent(App(null), document.body);
},{"./App.js":"/Users/christianalfoni/Documents/dev/flux-react-boilerplate/app/App.js","flux-react":"flux-react","react":"react"}],"/Users/christianalfoni/Documents/dev/flux-react-boilerplate/app/App.js":[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var Checkboxes = require('./components/Checkboxes.js');
var NameThrower = require('./components/NameThrower.js');
	
var App = React.createClass({displayName: 'App',
	render: function() {
		return (
			React.DOM.div(null, 
				React.DOM.h1(null, "Hello world!"), 
				React.DOM.div(null, 
					Checkboxes(null)
				), 
				React.DOM.div(null, 
					NameThrower(null)
				)
			)
		);
	}
});
	
module.exports = App;

},{"./components/Checkboxes.js":"/Users/christianalfoni/Documents/dev/flux-react-boilerplate/app/components/Checkboxes.js","./components/NameThrower.js":"/Users/christianalfoni/Documents/dev/flux-react-boilerplate/app/components/NameThrower.js","react":"react"}],"/Users/christianalfoni/Documents/dev/flux-react-boilerplate/app/actions.js":[function(require,module,exports){
module.exports = flux.createActions([
  'checkAll',
  'uncheckAll',
  'check'
]);
},{}],"/Users/christianalfoni/Documents/dev/flux-react-boilerplate/app/components/Checkboxes.js":[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var flux = require('flux-react');
var actions = require('./../actions.js');
var ColoredCheckbox = require('./Checkboxes/ColoredCheckbox.js');
var CheckboxStore = require('../stores/CheckboxStore.js');

var Checkboxes = React.createClass({displayName: 'Checkboxes',
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
		return ColoredCheckbox({
						key: index, 
						color: checkbox.color, 
						checked: checkbox.checked, 
						onChange: this.check})
	},
	render: function() {
		var checkboxes = this.state.checkboxes.map(this.renderCheckbox);
		return (
			React.DOM.div(null, 
				React.DOM.div(null, 
					checkboxes
				), 
				React.DOM.div(null, 
					React.DOM.button({onClick: this.checkAll}, "Check all"), 
					React.DOM.button({onClick: this.uncheckAll}, "Uncheck all")
				)
			)
		);
	}
	
});
	
module.exports = Checkboxes;

},{"../stores/CheckboxStore.js":"/Users/christianalfoni/Documents/dev/flux-react-boilerplate/app/stores/CheckboxStore.js","./../actions.js":"/Users/christianalfoni/Documents/dev/flux-react-boilerplate/app/actions.js","./Checkboxes/ColoredCheckbox.js":"/Users/christianalfoni/Documents/dev/flux-react-boilerplate/app/components/Checkboxes/ColoredCheckbox.js","flux-react":"flux-react","react":"react"}],"/Users/christianalfoni/Documents/dev/flux-react-boilerplate/app/components/Checkboxes/ColoredCheckbox.js":[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
	
var ColoredCheckbox = React.createClass({displayName: 'ColoredCheckbox',
	changeColor: function () {
		this.props.onChange(this.props.color);
	},
	render: function() {
		var style = {
			backgroundColor: this.props.color,
			padding: '5px'
		};
		return (
			React.DOM.span({key: this.props.key, style: style}, 
				React.DOM.input({type: "checkbox", 
					onChange: this.changeColor, 
					checked: this.props.checked})
			)
		);
	}
	
});
	
module.exports = ColoredCheckbox;

},{"react":"react"}],"/Users/christianalfoni/Documents/dev/flux-react-boilerplate/app/components/NameThrower.js":[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var CheckboxStore = require('../stores/CheckboxStore.js');
	
var NameThrower = React.createClass({displayName: 'NameThrower',
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
			return React.DOM.div({key: index, style: style}, this.state.name)
	},
	render: function() {
		var names = this.state.colors.map(this.renderColors);
		return (
			React.DOM.div(null, 
				React.DOM.div(null, 
					React.DOM.input({type: "text", value: this.state.name, onChange: this.updateName})
				), 
				React.DOM.div(null, 
					names
				)
			)
		);
	}
	
});
	
module.exports = NameThrower;

},{"../stores/CheckboxStore.js":"/Users/christianalfoni/Documents/dev/flux-react-boilerplate/app/stores/CheckboxStore.js","react":"react"}],"/Users/christianalfoni/Documents/dev/flux-react-boilerplate/app/stores/CheckboxStore.js":[function(require,module,exports){
var flux = require('flux-react');
var actions = require('./../actions.js');

var CheckboxStore = flux.createStore({
	getInitialState: function () {
		return {
			checkboxes: [{
				color: 'red',
				checked: false
			}, {
				color: 'blue',
				checked: false
			}, {
				color: 'green',
				checked: false
			}]
		};
	},
	actions: [
		actions.checkAll,
		actions.uncheckAll,
		actions.check
	],
	checkAll: function () {
		this.state.checkboxes.forEach(function (checkbox) {
			checkbox.checked = true;
		});
		this.emitChange();
	},
	uncheckAll: function () {
		this.state.checkboxes.forEach(function (checkbox) {
			checkbox.checked = false;
		});
		this.emitChange();
	},
	check: function (color) {
		this.state.checkboxes.forEach(function (checkbox) {
			if (checkbox.color === color) {
				checkbox.checked = !checkbox.checked;
			}
		});
		this.emitChange();
	},
	exports: {
		getCheckboxes: function () {
			return this.checkboxes;
		},
		getColors: function () {
			return this.checkboxes.map(function (checkbox) {
				if (checkbox.checked) {
					return checkbox.color;
				} else {
					return 'black';
				}
			});
		}
	}
});

module.exports = CheckboxStore;
},{"./../actions.js":"/Users/christianalfoni/Documents/dev/flux-react-boilerplate/app/actions.js","flux-react":"flux-react"}]},{},["./app/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2FwcC9tYWluLmpzIiwiL1VzZXJzL2NocmlzdGlhbmFsZm9uaS9Eb2N1bWVudHMvZGV2L2ZsdXgtcmVhY3QtYm9pbGVycGxhdGUvYXBwL0FwcC5qcyIsIi9Vc2Vycy9jaHJpc3RpYW5hbGZvbmkvRG9jdW1lbnRzL2Rldi9mbHV4LXJlYWN0LWJvaWxlcnBsYXRlL2FwcC9hY3Rpb25zLmpzIiwiL1VzZXJzL2NocmlzdGlhbmFsZm9uaS9Eb2N1bWVudHMvZGV2L2ZsdXgtcmVhY3QtYm9pbGVycGxhdGUvYXBwL2NvbXBvbmVudHMvQ2hlY2tib3hlcy5qcyIsIi9Vc2Vycy9jaHJpc3RpYW5hbGZvbmkvRG9jdW1lbnRzL2Rldi9mbHV4LXJlYWN0LWJvaWxlcnBsYXRlL2FwcC9jb21wb25lbnRzL0NoZWNrYm94ZXMvQ29sb3JlZENoZWNrYm94LmpzIiwiL1VzZXJzL2NocmlzdGlhbmFsZm9uaS9Eb2N1bWVudHMvZGV2L2ZsdXgtcmVhY3QtYm9pbGVycGxhdGUvYXBwL2NvbXBvbmVudHMvTmFtZVRocm93ZXIuanMiLCIvVXNlcnMvY2hyaXN0aWFuYWxmb25pL0RvY3VtZW50cy9kZXYvZmx1eC1yZWFjdC1ib2lsZXJwbGF0ZS9hcHAvc3RvcmVzL0NoZWNrYm94U3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcbnZhciBBcHAgPSByZXF1aXJlKCcuL0FwcC5qcycpO1xuXG5mbHV4LmRlYnVnKCk7XG5cblJlYWN0LnJlbmRlckNvbXBvbmVudChBcHAobnVsbCksIGRvY3VtZW50LmJvZHkpOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBDaGVja2JveGVzID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0NoZWNrYm94ZXMuanMnKTtcbnZhciBOYW1lVGhyb3dlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9OYW1lVGhyb3dlci5qcycpO1xuXHRcbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdBcHAnLFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHRSZWFjdC5ET00uZGl2KG51bGwsIFxuXHRcdFx0XHRSZWFjdC5ET00uaDEobnVsbCwgXCJIZWxsbyB3b3JsZCFcIiksIFxuXHRcdFx0XHRSZWFjdC5ET00uZGl2KG51bGwsIFxuXHRcdFx0XHRcdENoZWNrYm94ZXMobnVsbClcblx0XHRcdFx0KSwgXG5cdFx0XHRcdFJlYWN0LkRPTS5kaXYobnVsbCwgXG5cdFx0XHRcdFx0TmFtZVRocm93ZXIobnVsbClcblx0XHRcdFx0KVxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cbn0pO1xuXHRcbm1vZHVsZS5leHBvcnRzID0gQXBwO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZUFjdGlvbnMoW1xuICAnY2hlY2tBbGwnLFxuICAndW5jaGVja0FsbCcsXG4gICdjaGVjaydcbl0pOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuLy4uL2FjdGlvbnMuanMnKTtcbnZhciBDb2xvcmVkQ2hlY2tib3ggPSByZXF1aXJlKCcuL0NoZWNrYm94ZXMvQ29sb3JlZENoZWNrYm94LmpzJyk7XG52YXIgQ2hlY2tib3hTdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3Jlcy9DaGVja2JveFN0b3JlLmpzJyk7XG5cbnZhciBDaGVja2JveGVzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnQ2hlY2tib3hlcycsXG5cdHN0b3JlczogW0NoZWNrYm94U3RvcmVdLFxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y2hlY2tib3hlczogQ2hlY2tib3hTdG9yZS5nZXRDaGVja2JveGVzKClcblx0XHR9O1xuXHR9LFxuXHRjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcblx0XHRDaGVja2JveFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMudXBkYXRlKTtcblx0fSxcblx0Y29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcblx0XHRDaGVja2JveFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMudXBkYXRlKTtcblx0fSxcblx0dXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjaGVja2JveGVzOiBDaGVja2JveFN0b3JlLmdldENoZWNrYm94ZXMoKVxuXHRcdH0pO1xuXHR9LFxuXHRjaGVjazogZnVuY3Rpb24gKGNvbG9yKSB7XG5cdFx0YWN0aW9ucy5jaGVjayhjb2xvcik7XG5cdH0sXG5cdGNoZWNrQWxsOiBmdW5jdGlvbiAoKSB7XG5cdFx0YWN0aW9ucy5jaGVja0FsbCgpO1xuXHR9LFxuXHR1bmNoZWNrQWxsOiBmdW5jdGlvbiAoKSB7XG5cdFx0YWN0aW9ucy51bmNoZWNrQWxsKCk7XG5cdH0sXG5cdHJlbmRlckNoZWNrYm94OiBmdW5jdGlvbiAoY2hlY2tib3gsIGluZGV4KSB7XG5cdFx0cmV0dXJuIENvbG9yZWRDaGVja2JveCh7XG5cdFx0XHRcdFx0XHRrZXk6IGluZGV4LCBcblx0XHRcdFx0XHRcdGNvbG9yOiBjaGVja2JveC5jb2xvciwgXG5cdFx0XHRcdFx0XHRjaGVja2VkOiBjaGVja2JveC5jaGVja2VkLCBcblx0XHRcdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLmNoZWNrfSlcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgY2hlY2tib3hlcyA9IHRoaXMuc3RhdGUuY2hlY2tib3hlcy5tYXAodGhpcy5yZW5kZXJDaGVja2JveCk7XG5cdFx0cmV0dXJuIChcblx0XHRcdFJlYWN0LkRPTS5kaXYobnVsbCwgXG5cdFx0XHRcdFJlYWN0LkRPTS5kaXYobnVsbCwgXG5cdFx0XHRcdFx0Y2hlY2tib3hlc1xuXHRcdFx0XHQpLCBcblx0XHRcdFx0UmVhY3QuRE9NLmRpdihudWxsLCBcblx0XHRcdFx0XHRSZWFjdC5ET00uYnV0dG9uKHtvbkNsaWNrOiB0aGlzLmNoZWNrQWxsfSwgXCJDaGVjayBhbGxcIiksIFxuXHRcdFx0XHRcdFJlYWN0LkRPTS5idXR0b24oe29uQ2xpY2s6IHRoaXMudW5jaGVja0FsbH0sIFwiVW5jaGVjayBhbGxcIilcblx0XHRcdFx0KVxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblx0XG59KTtcblx0XG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrYm94ZXM7XG4iLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cdFxudmFyIENvbG9yZWRDaGVja2JveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0NvbG9yZWRDaGVja2JveCcsXG5cdGNoYW5nZUNvbG9yOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLmNvbG9yKTtcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgc3R5bGUgPSB7XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJvcHMuY29sb3IsXG5cdFx0XHRwYWRkaW5nOiAnNXB4J1xuXHRcdH07XG5cdFx0cmV0dXJuIChcblx0XHRcdFJlYWN0LkRPTS5zcGFuKHtrZXk6IHRoaXMucHJvcHMua2V5LCBzdHlsZTogc3R5bGV9LCBcblx0XHRcdFx0UmVhY3QuRE9NLmlucHV0KHt0eXBlOiBcImNoZWNrYm94XCIsIFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLmNoYW5nZUNvbG9yLCBcblx0XHRcdFx0XHRjaGVja2VkOiB0aGlzLnByb3BzLmNoZWNrZWR9KVxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblx0XG59KTtcblx0XG5tb2R1bGUuZXhwb3J0cyA9IENvbG9yZWRDaGVja2JveDtcbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBDaGVja2JveFN0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL0NoZWNrYm94U3RvcmUuanMnKTtcblx0XG52YXIgTmFtZVRocm93ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdOYW1lVGhyb3dlcicsXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRuYW1lOiAnJyxcblx0XHRcdGNvbG9yczogQ2hlY2tib3hTdG9yZS5nZXRDb2xvcnMoKVxuXHRcdH07XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xuXHRcdENoZWNrYm94U3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy51cGRhdGUpO1xuXHR9LFxuXHRjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuXHRcdENoZWNrYm94U3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy51cGRhdGUpO1xuXHR9LFxuXHR1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGNvbG9yczogQ2hlY2tib3hTdG9yZS5nZXRDb2xvcnMoKVxuXHRcdH0pO1xuXHR9LFxuXHR1cGRhdGVOYW1lOiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG5hbWU6IGV2ZW50LnRhcmdldC52YWx1ZVxuXHRcdH0pO1xuXHR9LFxuXHRyZW5kZXJDb2xvcnM6IGZ1bmN0aW9uIChjb2xvciwgaW5kZXgpIHtcblx0XHRcdHZhciBzdHlsZSA9IHtjb2xvcjogY29sb3J9O1xuXHRcdFx0cmV0dXJuIFJlYWN0LkRPTS5kaXYoe2tleTogaW5kZXgsIHN0eWxlOiBzdHlsZX0sIHRoaXMuc3RhdGUubmFtZSlcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmFtZXMgPSB0aGlzLnN0YXRlLmNvbG9ycy5tYXAodGhpcy5yZW5kZXJDb2xvcnMpO1xuXHRcdHJldHVybiAoXG5cdFx0XHRSZWFjdC5ET00uZGl2KG51bGwsIFxuXHRcdFx0XHRSZWFjdC5ET00uZGl2KG51bGwsIFxuXHRcdFx0XHRcdFJlYWN0LkRPTS5pbnB1dCh7dHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiB0aGlzLnN0YXRlLm5hbWUsIG9uQ2hhbmdlOiB0aGlzLnVwZGF0ZU5hbWV9KVxuXHRcdFx0XHQpLCBcblx0XHRcdFx0UmVhY3QuRE9NLmRpdihudWxsLCBcblx0XHRcdFx0XHRuYW1lc1xuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuXHRcbm1vZHVsZS5leHBvcnRzID0gTmFtZVRocm93ZXI7XG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi8uLi9hY3Rpb25zLmpzJyk7XG5cbnZhciBDaGVja2JveFN0b3JlID0gZmx1eC5jcmVhdGVTdG9yZSh7XG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjaGVja2JveGVzOiBbe1xuXHRcdFx0XHRjb2xvcjogJ3JlZCcsXG5cdFx0XHRcdGNoZWNrZWQ6IGZhbHNlXG5cdFx0XHR9LCB7XG5cdFx0XHRcdGNvbG9yOiAnYmx1ZScsXG5cdFx0XHRcdGNoZWNrZWQ6IGZhbHNlXG5cdFx0XHR9LCB7XG5cdFx0XHRcdGNvbG9yOiAnZ3JlZW4nLFxuXHRcdFx0XHRjaGVja2VkOiBmYWxzZVxuXHRcdFx0fV1cblx0XHR9O1xuXHR9LFxuXHRhY3Rpb25zOiBbXG5cdFx0YWN0aW9ucy5jaGVja0FsbCxcblx0XHRhY3Rpb25zLnVuY2hlY2tBbGwsXG5cdFx0YWN0aW9ucy5jaGVja1xuXHRdLFxuXHRjaGVja0FsbDogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuc3RhdGUuY2hlY2tib3hlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaGVja2JveCkge1xuXHRcdFx0Y2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG5cdFx0fSk7XG5cdFx0dGhpcy5lbWl0Q2hhbmdlKCk7XG5cdH0sXG5cdHVuY2hlY2tBbGw6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLnN0YXRlLmNoZWNrYm94ZXMuZm9yRWFjaChmdW5jdGlvbiAoY2hlY2tib3gpIHtcblx0XHRcdGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcblx0XHR9KTtcblx0XHR0aGlzLmVtaXRDaGFuZ2UoKTtcblx0fSxcblx0Y2hlY2s6IGZ1bmN0aW9uIChjb2xvcikge1xuXHRcdHRoaXMuc3RhdGUuY2hlY2tib3hlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaGVja2JveCkge1xuXHRcdFx0aWYgKGNoZWNrYm94LmNvbG9yID09PSBjb2xvcikge1xuXHRcdFx0XHRjaGVja2JveC5jaGVja2VkID0gIWNoZWNrYm94LmNoZWNrZWQ7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5lbWl0Q2hhbmdlKCk7XG5cdH0sXG5cdGV4cG9ydHM6IHtcblx0XHRnZXRDaGVja2JveGVzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jaGVja2JveGVzO1xuXHRcdH0sXG5cdFx0Z2V0Q29sb3JzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jaGVja2JveGVzLm1hcChmdW5jdGlvbiAoY2hlY2tib3gpIHtcblx0XHRcdFx0aWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gY2hlY2tib3guY29sb3I7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuICdibGFjayc7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tib3hTdG9yZTsiXX0=
