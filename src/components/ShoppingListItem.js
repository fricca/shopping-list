import React, { Component } from "react";
import shoppingItemPropType from "./propTypes/shoppingItemPropType";

class ShoppingListItem extends Component {
    static propTypes = {
        shoppingListItem: shoppingItemPropType,
    };

    renderItemText = item => {
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

    render() {
        const { shoppingListItem: item } = this.props;

        return (
            <div className="shopping-item">
                {this.renderItemText(item)}
                <div className="shopping-item__action">
                    <button
                        type="button"
                        onClick={() =>
                            this.props.deleteShoppingListItem(item.id)
                        }>
                        Delete item
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            this.props.markAsBought(item);
                        }}>
                        {!item.bought ? "Mark as bought" : "Unmark"}
                    </button>
                </div>
            </div>
        );
    }
}

export default ShoppingListItem;
