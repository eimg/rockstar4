import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#555'
    },
    appbar: {
        flexDirection: 'row',
        paddingTop: 40,
        paddingLeft: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        backgroundColor: '#111',
    },
    title: {
        marginLeft: 20,
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold'
    },
    add: {
        flexDirection: 'row',
        backgroundColor: '#aaa',
        padding: 10
    },
    input: {
        flexGrow: 1
    },
    item: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#999'
    },
    itemText: {
        fontSize: 20,
        color: '#fff',
        marginLeft: 20,
        flex: 1
    },
    done: {
        fontSize: 16,
        color: '#aaa',
        textDecorationLine: 'line-through'
    }
});

const api = 'http://192.168.100.6:8000/tasks';

const TaskItem = props => (
    <View style={styles.item}>
        <TouchableOpacity onPress={() => {
            props.done(props.task._id)
        }}>
            <MaterialIcons name="radio-button-unchecked" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.itemText}>{props.task.subject}</Text>
        <TouchableOpacity onPress={() => {
            props.remove(props.task._id)
        }}>
            <MaterialIcons name="delete" size={32} color="pink" />
        </TouchableOpacity>
    </View>
);

const DoneItem = props => (
    <View style={styles.item}>
        <TouchableOpacity onPress={() => {
            props.undo(props.task._id)
        }}>
            <MaterialIcons name="check-circle" size={32} color="white" />
        </TouchableOpacity>
        <Text style={[styles.itemText, styles.done]}>{props.task.subject}</Text>
        <TouchableOpacity onPress={() => {
            props.remove(props.task._id)
        }}>
            <MaterialIcons name="delete" size={32} color="pink" />
        </TouchableOpacity>
    </View>
);

class App extends React.Component {
    state = {
        tasks: [],
        text: '',
    };

    componentWillMount() {
        fetch(api).then(res => res.json()).then(json => {
            this.setState({
                tasks: json
            });
        });
    }

    add = () => {
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subject: this.state.text })
        }).then(res => res.json()).then(json => {
            this.setState({
                tasks: [
                    ...this.state.tasks, json
                ],
                text: ''
            });
        });
    }

    done = _id => {
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

    undo = _id => {
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

    remove = _id => {
        fetch(`${api}/${_id}`, {
            method: 'DELETE'
        }).then(res => {
            this.setState({
                tasks: this.state.tasks.filter(item => item._id !== _id)
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.appbar}>
                    <MaterialIcons name="list" size={38} color="white" />
                    <Text style={styles.title}>
                        Native Todo App
                    </Text>
                </View>
                <View style={styles.add}>
                    <TextInput
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                        style={styles.input} />
                    <Button
                        onPress={this.add}
                        title="ADD" />
                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.tasks.filter(item => item.status === 0)}
                        renderItem={current => <TaskItem task={current.item} done={this.done} remove={this.remove} />}
                        keyExtractor={task => task._id}
                    />
                    <FlatList
                        data={this.state.tasks.filter(item => item.status === 1)}
                        renderItem={current => <DoneItem task={current.item} undo={this.undo} remove={this.remove} />}
                        keyExtractor={task => task._id}
                    />
                </ScrollView>
            </View>
        )
    }
}
export default App;
