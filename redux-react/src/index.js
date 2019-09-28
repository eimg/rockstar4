import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

var store = createStore((state = [], action) => {
    switch(action.type) {
        case 'ADD':
            return [ ...state, { name: action.name } ];
        case 'DEL':
            return state.filter(item => item.name !== action.name);
        default:
            return state;
    }
});

store.dispatch({ type: 'ADD', name: 'Apple' });
store.dispatch({ type: 'ADD', name: 'Mango' });

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
