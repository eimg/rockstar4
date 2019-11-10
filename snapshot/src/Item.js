import React from 'react';

const Item = props => (
    <li>
        {props.name} (${props.price})
    </li>
);

export default Item;
