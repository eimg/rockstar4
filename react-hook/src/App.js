import React, { useState, useEffect, createRef } from "react";

const api = 'http://localhost:8000/tasks';

const App = props => {
    let input = createRef();
    let [ tasks, setTasks ] = useState([]);

    useEffect(() => {
        fetch(api).then(res => res.json()).then(json => {
            setTasks(json);
        });
    }, []);

    const add = () => {
        let subject = input.current.value;
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subject })
        }).then(res => res.json()).then(json => {
            setTasks([ ...tasks, json ]);
        });
    }

    const del = (_id) => () => {
        fetch(`${api}/${_id}`, {
            method: 'DELETE'
        }).then(res => {
            setTasks(tasks.filter(item => item._id !== _id));
        });
    }

    return (
        <div>
            <h1>Todo Hook</h1>
            <ul>
                {tasks.map(item => {
                    return (
                        <li key={item._id}>
                            {item.subject}
                            <a href="#/" onClick={del(item._id)}>&times;</a>
                        </li>
                    )
                })}
            </ul>
            <input type="text" ref={input} />
            <button onClick={add}>+</button>
        </div>
    )
}

export default App;
