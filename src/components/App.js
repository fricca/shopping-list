import React, { Component } from "react";
import { v1 as uuidv1 } from "uuid";
import Header from "./Header";
import ShoppingList from "./ShoppingList";
import AddForm from "./AddForm";
import Footer from "./Footer";
import Drop from "./Drop";
import Message from "./Message/Message";
import categories from "../data/categories.json";

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
        shoppingItems: [],
        archivedItems: [],
        messages: [],
        editItem: null,
        showDrawer: false,
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
        const items = this.state.shoppingItems;
        this.setState({
            shoppingItems: items.map(item => {
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

    archiveShoppingList = ev => {
        ev.preventDefault();

        const doit = window.confirm(
            "Finish shopping: Move items marked as bought to the archive."
        );
        if (doit) {
            const bought = this.state.shoppingItems.filter(item => item.bought);
            const open = this.state.shoppingItems.filter(item => !item.bought);
            this.setState({
                archivedItems: bought || [],
                shoppingItems: open || [],
            });
        }
    };

    hasBoughtItems = () => {
        return (
            this.state.shoppingItems &&
            this.state.shoppingItems.find(item => item.bought)
        );
    };

    // ShoppingItems
    addShoppingItem = ({ name, manufacturer, category }) => {
        const items = this.state.shoppingItems;
        this.setState({
            shoppingItems: [
                ...items,
                {
                    ...initialItem,
                    id: uuidv1(),
                    name,
                    manufacturer,
                    category,
                },
            ],
        });
    };

    deleteShoppingItem = id => {
        const items = this.state.shoppingItems;
        let deletedIndex;

        this.setState(
            {
                shoppingItems: items.filter((item, index) => {
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
                            shoppingItems: items,
                        });
                    },
                });
            }
        );
    };

    updateShoppingItem = updateItem => {
        const { shoppingItems } = this.state;

        if (updateItem.id) {
            this.setState({
                shoppingItems: shoppingItems.map(item =>
                    updateItem.id === item.id ? updateItem : item
                ),
            });

            // Close drawer and reset item
            this.toggleDrawer();
        }
    };

    // Drawer
    setEditItem = item => {
        this.setState({ editItem: item || null });
    };

    toggleDrawer = item => {
        const newItem = item || null;

        // Drawer should be closed and editItem reset if
        // a. is open and no item is passed in
        // b. same item is passed in again
        const showDrawer = !(
            (this.state.showDrawer && !item) ||
            (this.state.editItem && this.state.editItem.id === item.id)
        );

        this.setEditItem(showDrawer ? newItem : null);
        this.setState({ showDrawer });
    };

    // Lifecycle
    componentDidMount() {
        const stored = localStorage.getItem(storageName);
        if (stored) {
            const { shoppingItems, archivedItems } = JSON.parse(stored);
            this.setState({
                shoppingItems: shoppingItems || [],
                archivedItems: archivedItems || [],
            });
        }
    }

    componentDidUpdate() {
        const { shoppingItems, archivedItems } = this.state;
        localStorage.setItem(
            storageName,
            JSON.stringify({ shoppingItems, archivedItems })
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
                <Header>
                    <div className="action">
                        <button
                            className="btn btn--secondary action__item"
                            type="button"
                            onClick={this.archiveShoppingList}
                            disabled={!this.hasBoughtItems()}>
                            Archive
                        </button>
                        <button
                            className="btn btn--secondary action__item"
                            type="button">
                            Edit
                        </button>
                    </div>
                </Header>
                <main className="page__main shopping holder">
                    <ShoppingList
                        categories={categories}
                        shoppingItems={this.state.shoppingItems}
                        markAsBought={this.toggleBought}
                        deleteShoppingItem={this.deleteShoppingItem}
                        toggleDrawer={this.toggleDrawer}
                        editItem={this.state.editItem}
                    />
                    <Drop
                        trigger={{ show: "Add Item" }}
                        classes={{
                            wrap: "drawer holder is-bledoff",
                            trigger: "drawer__trigger",
                            content: "drawer__content",
                        }}
                        toggleFunc={this.toggleDrawer}
                        visible={this.state.showDrawer}>
                        <AddForm
                            categories={categories}
                            addShoppingItem={this.addShoppingItem}
                            updateShoppingItem={this.updateShoppingItem}
                            editItem={this.state.editItem}
                            resetEditItem={() => this.setEditItem()}
                        />
                    </Drop>
                </main>
                <Footer />
                {showMessage}
            </>
        );
    }
}

export default App;
