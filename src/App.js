import React, { Component } from "react";
import { v1 as uuidv1 } from "uuid";
import Header from "./components/Header";
import ShoppingList from "./components/ShoppingList";
import AddForm from "./components/AddForm";
import Footer from "./components/Footer";

class App extends Component {
    state = {
        shoppingListItems: [
            {
                id: "item1",
                name: "Zucker",
                manufacturer: "Bio",
                bought: false,
            },
            {
                id: "item2",
                name: "Klopapier",
                bought: false,
            },
        ],
    };

    toggleBought = updateItem => {
        const items = this.state.shoppingListItems;
        this.setState({
            shoppingListItems: items.map(item => {
                return item.id === updateItem.id
                    ? {
                          ...item,
                          bought: !item.bought,
                          lastBought: !item.bought
                              ? Date.now()
                              : item.lastBought,
                          count: !item.bought
                              ? item.count + 1 || 1
                              : Math.max(0, item.count - 1),
                      }
                    : item;
            }),
        });
    };

    addShoppingListItem = ({ name, manufacturer }) => {
        const items = this.state.shoppingListItems;

        items.push({
            id: uuidv1(),
            name,
            manufacturer,
            bought: false,
        });

        this.setState({ shoppingListItems: items });
    };

    render() {
        return (
            <>
                <Header />
                <main>
                    <ShoppingList
                        shoppingListItems={this.state.shoppingListItems}
                        markAsBought={this.toggleBought}
                    />
                    <AddForm addShoppingListItem={this.addShoppingListItem} />
                </main>
                <Footer />
            </>
        );
    }
}

export default App;
