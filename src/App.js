import React, { Component } from "react";
import { v1 as uuidv1 } from "uuid";
import Header from "./components/Header";
import ShoppingList from "./components/ShoppingList";
import AddForm from "./components/AddForm";
import Footer from "./components/Footer";
import Message from "./components/Message/Message";

const initialItem = {
    id: "",
    name: "",
    manufacturer: "",
    bought: false,
    lastBought: 0,
    count: 0,
};

const storageName = "shoppingList";

class App extends Component {
    state = {
        shoppingListItems: [],
        archivedItems: [],
        messages: [],
    };

    // Messages
    addMessage = message => {
        this.setState({
            messages: [...this.state.messages, { ...message, id: uuidv1() }],
        });
    };

    removeMessage = id => {
        this.setState({
            messages: this.state.messages.filter(mess => mess.id !== id),
        });
    };

    // Shopping list
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
        this.setState({
            shoppingListItems: [
                ...items,
                {
                    ...initialItem,
                    id: uuidv1(),
                    name,
                    manufacturer,
                },
            ],
        });
    };

    deleteShoppingListItem = id => {
        const items = this.state.shoppingListItems;
        let deletedIndex;

        this.setState(
            {
                shoppingListItems: items.filter((item, index) => {
                    if (item.id === id) {
                        deletedIndex = index;
                        return false;
                    }
                    return true;
                }),
            },
            () => {
                // Undo?
                this.addMessage({
                    content: `${items[deletedIndex].name} has been deleted.`,
                    button: "Undo?",
                    callback: () => {
                        this.setState({
                            shoppingListItems: items,
                        });
                    },
                });
            }
        );
    };

    archiveShoppingList = ev => {
        ev.preventDefault();

        const bought = this.state.shoppingListItems.filter(item => item.bought);
        const open = this.state.shoppingListItems.filter(item => !item.bought);
        this.setState({
            archivedItems: bought,
            shoppingListItems: open,
        });
    };

    hasBoughtItems = () => {
        return !!this.state.shoppingListItems.find(item => item.bought);
    };

    // Lifecycle
    componentDidMount() {
        const stored = localStorage.getItem(storageName);
        if (stored) {
            const { shoppingListItems, archivedItems } = JSON.parse(stored);
            this.setState({
                shoppingListItems,
                archivedItems,
            });
        }
    }

    componentDidUpdate() {
        const { shoppingListItems, archivedItems } = this.state;
        localStorage.setItem(
            storageName,
            JSON.stringify({ shoppingListItems, archivedItems })
        );
    }

    render() {
        let showMessage = "";
        if (this.state.messages.length && this.state.messages[0].content) {
            showMessage = (
                <Message
                    message={this.state.messages[0]}
                    removeMessage={this.removeMessage}
                />
            );
        }

        return (
            <>
                <Header />
                <main>
                    <ShoppingList
                        shoppingListItems={this.state.shoppingListItems}
                        markAsBought={this.toggleBought}
                        deleteShoppingListItem={this.deleteShoppingListItem}
                    />
                    <AddForm addShoppingListItem={this.addShoppingListItem} />
                    <button
                        type="button"
                        onClick={this.archiveShoppingList}
                        disabled={!this.hasBoughtItems()}>
                        Bought Items to Archive
                    </button>
                </main>
                <Footer />
                {showMessage}
            </>
        );
    }
}

export default App;
