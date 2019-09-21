import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

import React from "react";
import Todo from "./Todo";
import Header from "./Header";

const styles = {
    paper: {
        display: 'flex'
    },
    input: {
        flexGrow: 1,
        padding: 10
    }
}

class App extends React.Component {
    input = React.createRef();
    autoid = 3;
    state = {
        tasks: [
            { _id: 1, subject: 'Milk', status: 0 },
            { _id: 2, subject: 'Bread', status: 1 },
            { _id: 3, subject: 'Butter', status: 0 },
        ]
    }

    add = () => {
        this.setState({
            tasks: [
                ...this.state.tasks,
                { _id: ++this.autoid, subject: this.input.current.value, status: 0 }
            ]
        });
    }

    remove = (_id) => () => {
        this.setState({
            tasks: this.state.tasks.filter(item => item._id !== _id)
        });
    }

    done = (_id) => () => {
        this.setState({
            tasks: this.state.tasks.map(item => {
                if(item._id === _id) item.status = 1;
                return item;
            })
        });
    }

    undo = (_id) => () => {
        this.setState({
            tasks: this.state.tasks.map(item => {
                if(item._id === _id) item.status = 0;
                return item;
            })
        });
    }

    clear = () => {
        this.setState({
            tasks: this.state.tasks.filter(item => item.status === 0)
        })
    }

    render() {
        return (
            <div>
                <Header count={ this.state.tasks.filter(
                        item => item.status === 0
                    ).length }
                    clear={this.clear}
                />

                <Paper style={styles.paper}>
                    <InputBase
                        inputRef={this.input}
                        placeholder="Enter task"
                        style={styles.input} />
                    <IconButton onClick={this.add}>
                        <PlaylistAddIcon />
                    </IconButton>
                </Paper>

                <Todo
                    done={this.done}
                    undo={this.undo}
                    remove={this.remove}
                    items={this.state.tasks.filter(item => item.status === 0)}
                />
                <Divider />
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
