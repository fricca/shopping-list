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
            },
            {
                id: "item2",
                name: "Klopapier",
            },
        ],
    };

    addShoppingListItem = ({ name, manufacturer }) => {
        const items = this.state.shoppingListItems;

        items.push({
            id: uuidv1(),
            name,
            manufacturer,
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
                    />
                    <AddForm addShoppingListItem={this.addShoppingListItem} />
                </main>
                <Footer />
            </>
        );
    }
}

export default App;
