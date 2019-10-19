import React from "react";
import Todo from "./Todo";
import Header from "./Header";
import { connect } from 'react-redux';

let autoid = 2;

const App = props => {
    let input = React.createRef();

    return (
        <div>
            <Header count={ props.tasks.filter(
                    item => item.status === 0
                ).length } />

            <div>
                <input type="text" ref={input} />
                <button onClick={() => {
                    props.add(input.current.value);
                }}>+</button>
            </div>

            <Todo
                done={props.done}
                undo={props.undo}
                remove={props.remove}
                items={props.tasks.filter(item => item.status === 0)}
            />

            <Todo
                done={props.done}
                undo={props.undo}
                remove={props.remove}
                items={props.tasks.filter(item => item.status === 1)}
            />
        </div>
    );
}

const api = 'http://localhost:8000/tasks';

const ReduxApp = connect(state => {
    return {
        tasks: state.tasks
    }
}, dispatch => {
    return {
        add: subject => {
            fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ subject })
            }).then(res => res.json()).then(task => {
                dispatch({ type: 'ADD', task });
            });
        },
        remove: _id => {
            fetch(`${api}/${_id}`, {
                method: 'DELETE'
            }).then(res => {
                dispatch({ type: 'DEL', _id })
            });
        },
        done: _id => {
            fetch(`${api}/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 1 })
            }).then(res => {
                dispatch({ type: 'DONE', _id })
            });
        },
        undo: _id => {
            fetch(`${api}/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 0 })
            }).then(res => {
                dispatch({ type: 'UNDO', _id })
            });
        },
    }
})(App);

export default ReduxApp;
