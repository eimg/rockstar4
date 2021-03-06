import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore( (state = { tasks:[] }, action) => {
    switch(action.type) {
        case 'ADD':
            return {
                tasks: [
                    ...state.tasks,
                    action.task
                ]
            };
        case 'DEL':
            return {
                tasks: state.tasks.filter(item => item._id !== action._id)
            };
        case 'DONE':
            return {
                tasks: state.tasks.map(item => {
                    if(item._id === action._id) item.status = 1;
                    return item;
                })
            };
        case 'UNDO':
            return {
                tasks: state.tasks.map(item => {
                    if(item._id === action._id) item.status = 0;
                    return item;
                })
            };
        default:
            return state;
    }
});

const api = 'http://localhost:8000/tasks';

fetch(api).then(res => res.json()).then(json => {
    json.map(task => {
        store.dispatch({ type: 'ADD', task });
    });
});

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
