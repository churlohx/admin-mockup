/**
 * Generic state machine. Will invoke callbacks when mapped state transitions
 * occur.
 * 
 * There are two types of transitions, a well defined state x -> state y and a wildcard
 * which will be invoked when any state -> state x or state x -> any state occurs.
 * 
 * When registering callbacks for state changes there is also an option to not fire a 
 * callback if the state transition does not actually cause a state change. For example
 * state x -> state x
 * 
 * When using wildcard transition callbacks they will be invoked after the well defined transitions.
 * 
 * @author Eric
 */
elements.Model.extend('elements.StateMachine',
/* @Static */
{
},
/* @Prototype */
{
	transitionMap: {},
	currentState: null,
	initialState: null,
	context: null,
	debug: false,
	
	/**
	 * Register transitions as follows:
	 * {initialState: <initialState>,
	 *  context: <function context>,
	 *  transitions: [[<fromState>, <toState>, <callback>, <invokeIfStateUnchanged>]]}
	 */
	init: function(data) {
		this._super();
		this.initialState = data.initialState;
		this.context = data.context || this;
		var transitions = data.transitions || [];
		for (var i = 0; i < transitions.length; i++) {
			this.addTransition(transitions[i][0], transitions[i][1], transitions[i][2], transitions[i][3]);
		}
	},
	
	/**
	 * Add a transition which will be invoked when the state is changed from
	 * fromState to toState. If provided the given callback will be invoked. A
	 * wild card of '*' can be used to specify that the from or to state does
	 * not matter.
	 */
	addTransition: function(fromState, toState, callback, invokeOnUnchanged) {
		var arr = this.transitionMap[[fromState, toState]];
		if (typeof arr === "undefined") {
			arr = [];
			this.transitionMap[[fromState, toState]] = arr;
		}
		if (callback) {
			arr.push({fn: callback, invokeOnUnchanged: invokeOnUnchanged || false});
		}
	},

	reset: function() {
		this.currentState = this.initialState;
	},

	start: function() {
		this.currentState = this.initialState;
	},

	/**
	 * Transition to the given state. The given data will be passed to the callback function.
	 */
	transitionTo: function(toState, data) {
		var transitions = this.findTransitions(this.currentState, toState);
		var result;
		var stateChanged = this.currentState !== toState;

		if (typeof transitions === "undefined" && stateChanged) {
			throw Error("Illegal transition: " + this.formatStateChange(this.currentState, toState) );
		}

		for (var i = 0; i < transitions.length; i++) {
			if (stateChanged || transitions[i].invokeOnUnchanged) {
				this.logWithState(this.currentState, toState, "Invoking callback " + i);
				result = transitions[i].fn.call(this.context, data);
			} else {
				this.logWithState(this.currentState, toState, "Skipping callback " + i);
			}
			if (result === false) {
				this.logWithState(this.currentState, toState, "Callback " + i + " aborted processing.");
				break;
			}
		}

		this.currentState = toState;
	},

	findTransitions: function(fromState, toState) {
		var transitions = this.transitionMap[[fromState, toState]] || [];
		transitions = transitions.concat(this.transitionMap[["*", toState]] || []);
		transitions = transitions.concat(this.transitionMap[[fromState, "*"]] || []);
		return transitions;
	},

	logWithState: function(fromState, toState, msg) {
		this.log(this.formatStateChange(fromState, toState) + ": " + msg);
	},

	formatStateChange: function(fromState, toState) {
		return fromState + " -> " + toState;
	}
});




