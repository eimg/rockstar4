import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';

const App = props => {
    let input = React.createRef();
    
    return (
        <div>
            <ul>
                {props.data.map(function(v) {
                    return <Item name={v.name} />
                })}
            </ul>
            <input type="text" ref={input} />
            <button onClick={() => {
                props.add(input.current.value);
            }}>Button</button>
        </div>
    )
}

const ReduxApp = connect(state => {
    return {
        data: state
    }
}, dispatch => {
    return {
        add: (name) => {
            dispatch({ type: 'ADD', name });
        }
    }
})(App);

/* <App data={state} add={add} /> */

export default ReduxApp;
