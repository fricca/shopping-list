import React, { Component } from "react";
import PropTypes from "prop-types";
import shoppingItemPropType from "./propTypes";

const ItemContent = ({ bought, name }) => {
    let Tag = "span";
    if (bought) {
        Tag = "del";
    }

    return (
        <Tag className="shopping-item__item">
            <span className="shopping-item__name">{name}</span>
        </Tag>
    );
};

class ShoppingItem extends Component {
    static propTypes = {
        shoppingItem: shoppingItemPropType,
        markAsBought: PropTypes.func,
        deleteShoppingItem: PropTypes.func,
        toggleDrawer: PropTypes.func,
        editItem: shoppingItemPropType,
    };

    render() {
        const {
            shoppingItem: item,
            markAsBought,
            deleteShoppingItem,
            toggleDrawer,
            editItem,
        } = this.props;

        const isEdited = editItem && editItem.id === item.id;

        return (
            <div
                className={
                    "shopping-item" +
                    (item.bought ? " is-bought" : "") +
                    (isEdited ? " is-edited" : "")
                }>
                <ItemContent {...item} />
                <div className="shopping-item__action-group">
                    <button
                        className="btn shopping-item__action shopping-item__action--mark"
                        type="button"
                        onClick={() => {
                            markAsBought(item);
                        }}>
                        <span className="a11y-hidden">
                            {!item.bought ? "Mark as bought" : "Unmark bought"}
                        </span>
                    </button>
                    <button
                        className="btn shopping-item__action shopping-item__action--edit"
                        type="button"
                        onClick={() => toggleDrawer(item)}>
                        <span className="a11y-hidden">Edit item</span>
                    </button>
                    <button
                        className="btn shopping-item__action shopping-item__action--delete"
                        type="button"
                        onClick={() => deleteShoppingItem(item.id)}>
                        <span className="a11y-hidden">Delete item</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default ShoppingItem;
