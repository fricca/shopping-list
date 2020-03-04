import React, { Component } from "react";
import PropTypes from "prop-types";
import ShoppingItem from "./ShoppingItem";
import shoppingItemPropType from "./ShoppingItem/propTypes";

class ShoppingList extends Component {
    static propTypes = {
        categories: PropTypes.arrayOf(PropTypes.object),
        shoppingItems: PropTypes.arrayOf(shoppingItemPropType),
        markAsBought: PropTypes.func,
        deleteShoppingItem: PropTypes.func,
        toggleDrawer: PropTypes.func,
        editItem: shoppingItemPropType,
    };

    categorizeItems = () => {
        const { shoppingItems: items } = this.props;
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
                        <ShoppingItem
                            categories={this.props.categories}
                            shoppingItem={item}
                            markAsBought={this.props.markAsBought}
                            deleteShoppingItem={this.props.deleteShoppingItem}
                            toggleDrawer={this.props.toggleDrawer}
                            editItem={this.props.editItem}
                        />
                    </li>
                ))}
            </ul>
        );
    };

    render() {
        const { shoppingItems: items, categories, editMode } = this.props;
        const categorizedItems = this.categorizeItems();

        const content = items.length ? (
            <ul className={"cat-list__list" + (editMode ? " is-editable" : "")}>
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
