import React, { Component } from "react";
import classNames from "classnames";
import "./Drop.css";
import dropPropTypes from "../propTypes/dropPropType";

class Drop extends Component {
    static propTypes = dropPropTypes;

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
                    onClick={this.toggle}>
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
