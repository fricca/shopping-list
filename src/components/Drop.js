import React, { Component } from "react";
import PropTypes from "prop-types";

class Drop extends Component {
    static propTypes = {
        trigger: PropTypes.node,
        content: PropTypes.node.isRequired,
        visible: PropTypes.bool,
    };

    state = {
        visible: false,
    };

    componentDidMount() {
        this.updateVisiblity();
    }

    updateVisiblity = () => {
        if (
            typeof this.props.visible !== "undefined" &&
            this.props.visible !== this.state.visible
        ) {
            this.toggle();
        }
    };

    toggle = () => {
        const { visible } = this.state;
        this.setState({ visible: !visible });
    };

    handleClick = ev => {
        ev.preventDefault();
        this.toggle();
    };

    render() {
        const { trigger, content } = this.props;
        const { visible } = this.state;

        return (
            <div className={"drop" + (visible ? " is-shown" : "")}>
                <button
                    type="button"
                    className="drop__trigger"
                    onClick={this.toggle}>
                    {trigger || (!visible ? "Show more" : "Hide more")}
                </button>
                <div className="drop__content">{content}</div>
            </div>
        );
    }
}

export default Drop;
