import React from "react";
import Item from "./Item";

const Todo = props => (
    <ul>
        {props.items.map(item => {
            return (
                <Item
                    done={props.done}
                    undo={props.undo}
                    remove={props.remove}
                    key={item._id}
                    item={item}
                />
            )
        })}
    </ul>
)

export default Todo;
