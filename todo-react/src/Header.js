import React from "react";

const styles = {
    header: {
        margin: 0,
        padding: 10,
        background: 'black',
        color: 'white',
        fontSize: 21
    }
};

class Header extends React.Component {
    render() {
        return (
            <h1 style={styles.header}>Todo React ({ this.props.count })</h1>
        );
    }
}

export default Header;
