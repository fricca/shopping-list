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
            return (
                <ul>
                    {shoppingListItems.map(item => (
                        <li key={item.id}>
                            <ShoppingListItem
                            categories={this.props.categories}
                                shoppingListItem={item}
                                markAsBought={this.props.markAsBought}
                                deleteShoppingListItem={
                                    this.props.deleteShoppingListItem
                                }
                            />
                        </li>
                    ))}
                </ul>
            );
        }

        return "No Items Yet";
    }
}

export default ShoppingList;
