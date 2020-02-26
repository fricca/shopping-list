import React, { Component } from "react";
import shoppingItemPropType from "./propTypes/shoppingItemPropType";

class ShoppingListItem extends Component {
    static propTypes = {
        shoppingListItem: shoppingItemPropType,
    };

    render() {
        const { shoppingListItem } = this.props;

        return (
            <div className="shopping-item">
                {shoppingListItem.name}
                <button type="button">Delete item</button>
                <button type="button">Mark as bought</button>
            </div>
        );
    }
}

export default ShoppingListItem;
