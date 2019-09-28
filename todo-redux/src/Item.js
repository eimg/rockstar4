import React from "react";

const Item = props => (
    <li>
        {props.item.status
            ? <input type="checkbox" checked
                onChange={() => props.undo(props.item._id)} />
            : <input type="checkbox"
                onChange={() => props.done(props.item._id)} />
        }

        {props.item.subject}
        <a href="/#" onClick={() => props.remove(props.item._id)}>
            &times;
        </a>
    </li>
)

export default Item;
