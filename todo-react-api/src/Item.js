import React from "react";

class Item extends React.Component {
    render() {
        return (
            <li>
                {this.props.item.status
                    ? <input type="checkbox" checked
                        onChange={this.props.undo(this.props.item._id)} />
                    : <input type="checkbox"
                        onChange={this.props.done(this.props.item._id)} />
                }

                {this.props.item.subject}
                <a href="/#" onClick={this.props.remove(this.props.item._id)}>
                    &times;
                </a>
            </li>
        )
    }
}

export default Item;
