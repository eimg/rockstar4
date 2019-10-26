import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Button,
    FlatList,
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
        marginLeft: 20
    }
});

const TaskItem = props => (
    <View style={styles.item}>
        <MaterialIcons name="radio-button-unchecked" size={32} color="white" />
        <Text style={styles.itemText}>{props.task.subject}</Text>
    </View>
);

const DoneItem = props => (
    <View style={styles.item}>
        <MaterialIcons name="check-circle" size={32} color="white" />
        <Text style={styles.itemText}>{props.task.subject}</Text>
    </View>
);

class App extends React.Component {
    state = {
        tasks: [
            { _id: '1', subject: 'Milk', status: 0 },
            { _id: '2', subject: 'Bread', status: 1 },
            { _id: '3', subject: 'Butter', status: 0 },
        ]
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.appbar}>
                    <MaterialIcons name="list" size={38} color="white" />
                    <Text style={styles.title}>
                        Native Todo
                    </Text>
                </View>
                <View style={styles.add}>
                    <TextInput style={styles.input} />
                    <Button title="ADD" />
                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.tasks.filter(item => item.status === 0)}
                        renderItem={current => <TaskItem task={current.item} />}
                        keyExtractor={task => task._id}
                    />
                    <FlatList
                        data={this.state.tasks.filter(item => item.status === 1)}
                        renderItem={current => <DoneItem task={current.item} />}
                        keyExtractor={task => task._id}
                    />
                </ScrollView>
            </View>
        )
    }
}
export default App;
