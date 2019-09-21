import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";

class Item extends React.Component {
    render() {
        return (
            <ListItem>
                {this.props.item.status
                    ? <Checkbox checked="true"
                        onChange={this.props.undo(this.props.item._id)} />
                    : <Checkbox
                        onChange={this.props.done(this.props.item._id)} />
                }

                <ListItemText primary={this.props.item.subject} />

                <IconButton onClick={this.props.remove(this.props.item._id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        )
    }
}

export default Item;
