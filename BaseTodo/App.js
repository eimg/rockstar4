import React from 'react';
import { Font } from 'expo';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Title,
    Icon
} from 'native-base';

class App extends React.Component {
    render() {
        return (<Container>
            <Header>
                <Left>
                    <Icon name="ios-list"/>
                </Left>
                <Body>
                    <Title>Todo - Native Base</Title>
                </Body>
                <Right/>
            </Header>
        </Container>)
    }
}

export default App;
