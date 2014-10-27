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