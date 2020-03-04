import React, { Component } from "react";
import classNames from "classnames";
import "./style.css";
import dropPropTypes from "./propTypes";

class Drop extends Component {
    static propTypes = dropPropTypes;

    state = {
        visible: false,
        toggleByProp: false,
    };

    toggle = () => {
        this.setState({ visible: !this.state.visible });
    };

    handleClick = ev => {
        ev.preventDefault();
        this.state.toggleByProp ? this.props.toggleFunc() : this.toggle();
    };

    componentDidMount() {
        // Deal with function to set visibility from above
        if (typeof this.props.toggleFunc === "function") {
            this.setState({ toggleByProp: true });
        }

        // Deal with initially set visibility from above
        if (
            typeof this.props.visible !== "undefined" &&
            this.props.visible !== this.state.visible
        ) {
            this.toggle();
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.state.toggleByProp &&
            prevProps.visible !== this.props.visible
        ) {
            this.setState({ visible: this.props.visible });
        }
    }

    render() {
        const { trigger, classes: cssClasses } = this.props;
        const { visible } = this.state;

        const baseClass = "js-drop";
        const wrapClass = classNames(baseClass, cssClasses && cssClasses.wrap, {
            "is-shown": visible,
        });
        const triggerClass = classNames(
            "btn",
            baseClass + "__trigger",
            cssClasses && cssClasses.trigger
        );
        const contentClass = classNames(
            baseClass + "__content",
            cssClasses && cssClasses.content,
            {
                "is-shown": visible,
            }
        );

        return (
            <div className={wrapClass}>
                <button
                    type="button"
                    className={triggerClass}
                    onClick={this.handleClick}>
                    <span className={`${baseClass}__trigger-text`}>
                        {!visible
                            ? (trigger && trigger.show) || "Show more"
                            : (trigger && trigger.hide) || "Hide"}
                    </span>
                </button>
                <div className={contentClass}>{this.props.children}</div>
            </div>
        );
    }
}

export default Drop;
