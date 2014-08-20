var React = require('flux-react');
var merge = require('react/lib/merge');
var CheckboxActions = require('../actions/CheckboxActions.js');
var mergeInto = require('react/lib/mergeInto');
var Constants = require('../Constants.js');

var checkboxes = [{
	color: 'red',
	checked: false
}, {
	color: 'blue',
	checked: false
}, {
	color: 'green',
	checked: false
}];

var CheckboxStore = React.createStore({

	getCheckboxes: function () {
		return checkboxes.map(function (checkbox) {
			var checkboxCopy = {};
			mergeInto(checkboxCopy, checkbox); // Create a copy to make it impossible to mutate store
			return checkboxCopy;
		});
	},
	getColors: function () {
		return checkboxes.map(function (checkbox) {
			if (checkbox.checked) {
				return checkbox.color;
			} else {
				return 'black';
			}
		});
	},
	dispatch: function (payload) {
		switch (payload.type) {
			case CheckboxActions.CHECK_ALL:
			checkboxes.forEach(function (checkbox) {
				checkbox.checked = true;
			});
			break;

			case CheckboxActions.UNCHECK_ALL:
			checkboxes.forEach(function (checkbox) {
				checkbox.checked = false;
			});
			break;

			case CheckboxActions.CHECK:
			checkboxes.forEach(function (checkbox) {
				if (checkbox.color === payload.color) {
					checkbox.checked = !checkbox.checked;
				}
			});
			break;
		}
		this.flush();
	}

});

module.exports = CheckboxStore;