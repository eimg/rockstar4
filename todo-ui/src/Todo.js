import List from "@material-ui/core/List";

import React from "react";
import Item from "./Item";

class Todo extends React.Component {
    render() {
        return (
            <List>
                {this.props.items.map(item => {
                    return (
                        <Item
                            done={this.props.done}
                            undo={this.props.undo}
                            remove={this.props.remove}
                            key={item._id}
                            item={item}
                        />
                    )
                })}
            </List>
        )
    }
}

export default Todo;
