import React, { Component } from "react";
import PropTypes from "prop-types";
import ShoppingListItem from "./ShoppingListItem";
import shoppingItemPropType from "./propTypes/shoppingItemPropType";

class ShoppingList extends Component {
    static propTypes = {
        shoppingListItems: PropTypes.arrayOf(shoppingItemPropType),
    };

    categorizeItems = () => {
        const { shoppingListItems: items } = this.props;
        const categorized = {};
        this.props.categories.forEach(category => {
            if (items.find(item => item.category === category.id)) {
                categorized[category.id] = items.filter(
                    item => item.category === category.id
                );
            }
        });

        return categorized;
    };

    renderItemList = items => {
        return (
            <ul className="item-list__list">
                {items.map(item => (
                    <li key={item.id} className="item-list__item">
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
    };

    render() {
        const { shoppingListItems: items, categories } = this.props;
        const categorizedItems = this.categorizeItems();

        const content = items.length ? (
            <ul className="cat-list__list">
                {Object.keys(categorizedItems).map(catKey => {
                    const currentCat = categories.find(
                        cat => cat.id === catKey
                    );
                    if (currentCat) {
                        return (
                            <li className="cat-list__item" key={catKey}>
                                <h2 className="cat-list__title">
                                    {currentCat.symbol} {currentCat.name}
                                </h2>
                                <div className="cat-list__content item-list">
                                    {this.renderItemList(
                                        categorizedItems[catKey]
                                    )}
                                </div>
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        ) : (
            <p className="cat-list__empty">No items yet</p>
        );

        return (
            <div className={"cat-list" + (!items.length ? " is-empty" : "")}>
                {content}
            </div>
        );
    }
}

export default ShoppingList;
