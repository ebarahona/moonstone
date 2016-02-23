require('moonstone');

/**
* Contains the declarations for the {@link module:moonstone/ListActions~ListActions}
* and {@link module:moonstone/ListActions~ListActionPopup} kinds, and the
* {@link module:moonstone/ListActions~ListActionActivationSupport} mixin.
* @module moonstone/ListActions
*/

var
	dom = require('enyo/dom'),
	ri = require('enyo/resolution');

var
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	IconButton = require('moonstone/IconButton');

/**
* An internally-used support mixin added to a {@link module:moonstone/ListActions~ListActions}
* menu, which decorates `activate` events with the menu's `action` property.
*
* @mixin ListActionActivationSupport
* @protected
*/
var ListActionActivationSupport = {

	/**
	* @private
	*/
	name: 'ListActionActivationSupport',

	/**
	* @private
	*/
	handlers: {
		onActivate: 'activate'
	},

	/**
	* @private
	*/
	activate: function (sender, e) {
		e.action = this.action;
	}
};

/**
* {@link module:moonstone/ListActions~ListActionsPopup} is a
* [control]{@link module:moonstone/ContextualPopup~ContextualPopup} used by
* {@link module:moonstone/ListActions~ListActions} to house a menu of selectable options.
*
* @class ListActionsPopup
* @extends module:moonstone/ContextualPopup~ContextualPopup
* @ui
* @public
*/
var ListActionsPopup = ContextualPopup.kind(
	/** @lends module:moonstone/ListActions~ListActionsPopup */ {

	/**
	* @private
	*/
	classes: 'moon-list-actions-popup',

	/**
	* Adjust popup direction, anchor to the edge of screen if it goes over, and adjust arrow
	* positions.
	*
	* @private
	* @override
	*/
	alterDirection: function () {
		if (this.showing) {
			var clientRect = this.getBoundingRect(this.node),
				viewPortWidth = dom.getWindowWidth(),
				offsetWidth = (clientRect.width - this.activatorOffset.width) / 2,
				popupMargin = ri.scale(24),
				iconButtonWidth = this.activatorOffset.width + popupMargin,
				bounds = {top: null, left: null},
				c;

			this.resetDirection();
			this.addClass('below');

			if(this.activatorOffset.left < offsetWidth) {
				// flip towards right-side
				this.addClass('right');

				// adjust arrow position
				c = Math.round((this.activatorOffset.left - popupMargin) / iconButtonWidth);
				this.addClass('list-actions-' + (c + 1) + 'h');

				// anchor to the far left
				bounds.left = popupMargin;
			} else if(viewPortWidth - this.activatorOffset.right < offsetWidth) {
				// flip towards left-side
				this.addClass('left');

				// adjust arrow position
				c = Math.round((viewPortWidth - this.activatorOffset.right - popupMargin) / iconButtonWidth);
				this.addClass('list-actions-' + (c + 1) + 'h');

				// anchor to the far right
				bounds.left = viewPortWidth - clientRect.width - popupMargin;
			} else {
				bounds.left = this.activatorOffset.left - offsetWidth;
			}

			bounds.top = this.activatorOffset.bottom;

			this.setBounds(bounds);
		}
	}
});

/**
* {@link module:moonstone/ListActions~ListActions} is a [control]{@link module:enyo/Control~Control} designed to live within a
* {@link module:moonstone/Header~Header}. It is used to perform actions on an associated list of items. A
* ListActions [object]{@glossary Object} combines an activating control with a drawer
* containing a user-defined menu of selectable options for acting on items in the list.
* When a menu item is selected, an action--such as filtering, sorting, moving, or
* deleting--may be invoked in the application by handling change events from the selected
* items.
*
* @class ListActions
* @extends module:moonstone/ContextualPopupDecorator~ContextualPopupDecorator
* @ui
* @public
*/
var ListActions = ContextualPopupDecorator.kind({

	/**
	* @private
	*/
	classes: 'moon-list-actions',

	/**
	* A block of one or more controls to be displayed inside the list actions menu. By
	* default, each top-level [ListActions]{@link module:moonstone/ListActions~ListActions} will have a
	* [defaultKind]{@link module:enyo/Control~Control#defaultKind} of
	* [FittableRows]{@link module:layout/FittableRows~FittableRows}, and should typically contain a
	* {@link module:moonstone/Divider~Divider} identifying the category and a {@link module:moonstone/Scroller~Scroller} with
	* `fit: true` set on it, containing instances of {@link module:moonstone/CheckboxItem~CheckboxItem},
	* {@link module:moonstone/ToggleItem~ToggleItem}, or {@link module:moonstone/SelectableItem~SelectableItem} for setting options for
	* the underlying [panel]{@link module:moonstone/Panel~Panel}. Alternatively, a {@link module:moonstone/DataList~DataList}
	* may be used as the `fit: true` control for populating a data-bound list of options
	* (see below for limitations on using a `moon/DataList`).
	*
	* More than one option group may be added to the `listActions` block, in which options
	* are laid out horizontally by default, with the height of each `FittableRows` being
	* constrained to the height of the parent [Header]{@link module:moonstone/Header~Header}. However, a
	* minimum width (300px) is enforced for each group, and if there are more groups than
	* will fit in the available horizontal space, all controls will instead be stacked
	* vertically. In this case, an outer scroller is enabled; the outer scroller scrolls
	* all groups vertically, and the `FittableRows` are reset to natural size based on
	* their content, effectively disabling any scrollers contained within, to prevent
	* nested scrolling.
	*
	* Note that the vertical stacking capability poses a limitation on using
	* `moon/DataList`. Since `moon/DataList` must always be allowed to scroll, it is
	* not suitable for use in a stacked scenario in which only one outer scroller is
	* used. As such, it cannot be used within a `ListActions` that may need to stack
	* vertically.
	*
	* Each group should have a string value set for the `action` property, as this will
	* be passed in all events that bubble from the `ListActions`, to allow the user to
	* identify which category changed.
	*
	* @type {Object[]}
	* @default null
	* @public
	*/
	listActions: null,

	/**
	* Icon name to be used by the activator button (as in {@link module:moonstone/Icon~Icon} and
	* {@link module:moonstone/IconButton~IconButton}).
	*
	* @type {String}
	* @default ''
	* @public
	*/
	icon: '',

	/**
	* Source URL for icon image.
	*
	* @type {String|module:enyo/resolution#selectSrc~src}
	* @default ''
	* @public
	*/
	iconSrc: '',


	/**
	* The background-color opacity of the {@link module:moonstone/ListActions~ListActions}' activator
	* (which is a {@link module:moonstone/IconButton~IconButton}). Please see the valid values defined by
	* {@link module:moonstone/Button~Button#backgroundOpacity}.
	*
	* @type {String}
	* @default 'opaque'
	* @public
	*/
	backgroundOpacity: 'opaque',

	/**
	* CSS classes to apply to adjust width of each actions.
	*
	* @type {String}
	* @default moon-6h
	* @public
	*/
	actionWidthClasses: 'moon-6h',

	/**
	* @private
	*/
	components: [
		{name: 'activator', kind: IconButton},
		{name: 'listActionsPopup', kind: ListActionsPopup, components: [
			{name: 'listActionsWrapper', classes: 'moon-hspacing top'}
		]}
	],

	/**
	* @private
	*/
	bindings: [
		{from: 'iconSrc', to: '$.activator.src'},
		{from: 'icon', to: '$.activator.icon'},
		{from: 'disabled', to: '$.activator.disabled', oneWay: false},
		{from: 'backgroundOpacity', to: '$.activator.backgroundOpacity'}
	],

	/**
	* @private
	*/
	create: function() {
		ContextualPopupDecorator.prototype.create.apply(this, arguments);
		this.actionWidthClassesChanged();
		this.disabledChanged();
		this.listActionsChanged();
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		this.addRemoveClass('disabled', this.disabled);
	},

	/**
	* @private
	*/
	actionWidthClassesChanged: function() {
		this.$.listActionsWrapper.set('controlClasses', this.actionWidthClasses);
	},

	/**
	* @private
	*/
	listActionsChanged: function() {
		var i,
			listAction;

		for (i = 0; (listAction = this.listActions[i]); i++) {
			listAction.mixins = this.addListActionMixin(listAction);
			this.$.listActionsWrapper.createComponent(listAction, {owner: this.hasOwnProperty('listActions') ? this.getInstanceOwner() : this});
		}

		if (this.hasNode()) {
			this.$.listActionsWrapper.render();
		}
	},

	/**
	* Adds a mixin to each list action menu that decorates `activate` events with the menu's
	* `action` property.
	*
	* @private
	*/
	addListActionMixin: function (listAction) {
		var mixins = listAction.mixins || [];
		if (mixins.indexOf(ListActionActivationSupport) === -1) {
			mixins.push(ListActionActivationSupport);
		}
		return mixins;
	}
});


/**
* The ListActionActivationSupport mixin
*/
ListActions.ListActionActivationSupport = ListActionActivationSupport;

/**
* The {@link module:moonstone/ListActions~ListActionsPopup} kind
*/
ListActions.ListActionsPopup = ListActionsPopup;

module.exports = ListActions;