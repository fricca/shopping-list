import React, { Component } from "react";
import shoppingItemPropType from "./propTypes/shoppingItemPropType";

const renderItemText = item => {
    let Tag = "span";
    if (item.bought) {
        Tag = "del";
    }

    let Manufacturer = "";
    if (item.manufacturer) {
        Manufacturer = (
            <span className="shopping-item__manufacturer">
                {" "}
                ({item.manufacturer})
            </span>
        );
    }

    return (
        <Tag className="shopping-item__item">
            <span className="shopping-item__name">{item.name}</span>
            {Manufacturer}
        </Tag>
    );
};

class ShoppingListItem extends Component {
    static propTypes = {
        shoppingListItem: shoppingItemPropType,
    };

    render() {
        const { shoppingListItem } = this.props;

        return (
            <div className="shopping-item">
                {renderItemText(shoppingListItem)}
                <div className="shopping-item__action">
                    <button type="button">Delete item</button>
                    <button
                        type="button"
                        onClick={() => {
                            this.props.markAsBought(shoppingListItem);
                        }}>
                        {!shoppingListItem.bought ? "Mark as bought" : "Unmark"}
                    </button>
                </div>
            </div>
        );
    }
}

export default ShoppingListItem;
