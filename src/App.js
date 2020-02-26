import React, { Component } from "react";
import Header from "./components/Header";
import ShoppingList from "./components/ShoppingList";
import AddForm from "./components/AddForm";
import Footer from "./components/Footer";

class App extends Component {
    state = {
        shoppingListItems: [
            {
                id: 1,
                name: "Zucker",
                manufacturer: "Bio",
            },
            {
                id: 2,
                name: "Klopapier",
            },
        ],
    };

    render() {
        return (
            <>
                <Header />
                <main>
                    <ShoppingList
                        shoppingListItems={this.state.shoppingListItems}
                    />
                </main>
                <Footer />
            </>
        );
    }
}

export default App;
