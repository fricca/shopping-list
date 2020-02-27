import React, { Component } from "react";
import PropTypes from "prop-types";

export const messagePropTypes = {
    message: PropTypes.shape({
        content: PropTypes.node.isRequired,
        button: PropTypes.node,
        callback: PropTypes.func,
    }),
};

class Message extends Component {
    static propTypes = messagePropTypes;

    timer = null;

    removeMessage = () => {
        clearTimeout(this.timer);
        const { id } = this.props.message;
        this.props.removeMessage(id);
    };

    renderButton() {
        const { button, callback } = this.props.message;

        return (
            <button
                type="button"
                onClick={() => {
                    callback();
                    this.removeMessage();
                }}>
                {button}
            </button>
        );
    }

    render() {
        const { content, button, callback } = this.props.message;
        if (!content) return null;

        this.timer = setTimeout(this.removeMessage, callback ? 5000 : 2000);

        return (
            <div className="message">
                {content}
                {button && this.renderButton()}
            </div>
        );
    }
}

export default Message;
