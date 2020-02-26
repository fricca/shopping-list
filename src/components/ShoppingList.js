import React, { Component } from "react";
import PropTypes from "prop-types";
import ShoppingListItem from "./ShoppingListItem";
import shoppingItemPropType from "./propTypes/shoppingItemPropType";

class ShoppingList extends Component {
    static propTypes = {
        shoppingListItems: PropTypes.arrayOf(shoppingItemPropType),
    };

    render() {
        const { shoppingListItems } = this.props;

        if (shoppingListItems.length) {
            return shoppingListItems.map(item => (
                <ShoppingListItem key={item.id} shoppingListItem={item} />
            ));
        }

        return "No Items Yet";
    }
}

export default ShoppingList;
