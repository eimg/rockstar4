var createStore = require("redux").createStore;

var store = createStore(function(state = [], action) {
    if(action.type == "add") {
        return [ ...state, action.name ];
    }

    if(action.type == "del") {
        return state.filter(n => n != action.name);
    }
});

store.subscribe(function() {
    console.log(store.getState());
});

store.dispatch({ type: 'add', name: 'Alice' });
store.dispatch({ type: 'add', name: 'Bob' });
store.dispatch({ type: 'add', name: 'Tom' });
store.dispatch({ type: 'add', name: 'Mary' });
store.dispatch({ type: 'del', name: 'Bob' });
