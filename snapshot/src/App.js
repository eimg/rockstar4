import React from 'react';
import Item from './Item';

const App = props => {
    return (
        <div>
            <h1>Snapshot Test</h1>
            <ul>
                <Item name="Apple"
                    price="2.99" />
                <Item name="Orange"
                    price="3.99" />
            </ul>
        </div>
    );
}

export default App;
