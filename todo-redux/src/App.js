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
                    props.add({
                        _id: ++autoid,
                        subject: input.current.value,
                        status: 0,
                    });
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

const ReduxApp = connect(state => {
    return {
        tasks: state.tasks
    }
}, dispatch => {
    return {
        add: task => dispatch({ type: 'ADD', task }),
        remove: _id => dispatch({ type: 'DEL', _id }),
        done: _id => dispatch({ type: 'DONE', _id }),
        undo: _id => dispatch({ type: 'UNDO', _id }),
    }
})(App);

export default ReduxApp;
