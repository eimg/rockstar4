import React from "react";
import Todo from "./Todo";
import Header from "./Header";

const api = 'http://localhost:8000/tasks';

class App extends React.Component {
    input = React.createRef();
    autoid = 3;
    state = {
        tasks: []
    }

    componentWillMount() {
        fetch(api).then(res => res.json()).then(json => {
            this.setState({
                tasks: json
            });
        });
    }

    add = () => {
        let subject = this.input.current.value;
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subject })
        }).then(res => res.json()).then(json => {
            this.setState({
                tasks: [
                    ...this.state.tasks,
                    json
                ]
            });
        });
    }

    remove = (_id) => () => {
        fetch(`${api}/${_id}`, {
            method: 'DELETE'
        }).then(res => {
            this.setState({
                tasks: this.state.tasks.filter(item => item._id !== _id)
            });
        });
    }

    done = (_id) => () => {
        fetch(`${api}/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 1 })
        }).then(res => {
            this.setState({
                tasks: this.state.tasks.map(item => {
                    if(item._id === _id) item.status = 1;
                    return item;
                })
            });
        });
    }

    undo = (_id) => () => {
        fetch(`${api}/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 0 })
        }).then(res => {
            this.setState({
                tasks: this.state.tasks.map(item => {
                    if(item._id === _id) item.status = 0;
                    return item;
                })
            });
        });
    }

    render() {
        return (
            <div>
                <Header count={ this.state.tasks.filter(
                        item => item.status === 0
                    ).length } />

                <div>
                    <input type="text" ref={this.input} />
                    <button onClick={this.add}>+</button>
                </div>

                <Todo
                    done={this.done}
                    undo={this.undo}
                    remove={this.remove}
                    items={this.state.tasks.filter(item => item.status === 0)}
                />

                <Todo
                    done={this.done}
                    undo={this.undo}
                    remove={this.remove}
                    items={this.state.tasks.filter(item => item.status === 1)}
                />
            </div>
        );
    }
}

export default App;
