import React, { Component } from "react";
import shoppingItemPropType from "./propTypes/shoppingItemPropType";

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

class ShoppingListItem extends Component {
    static propTypes = {
        shoppingListItem: shoppingItemPropType,
    };

    render() {
        const {
            shoppingListItem: item,
            deleteShoppingListItem: deleteItem,
            markAsBought,
        } = this.props;

        return (
            <div
                className={"shopping-item" + (item.bought ? " is-bought" : "")}>
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
                        className="btn shopping-item__action shopping-item__action--delete"
                        type="button"
                        onClick={() => deleteItem(item.id)}>
                        <span className="a11y-hidden">Delete item</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default ShoppingListItem;
