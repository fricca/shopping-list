import React from "react";
import PropTypes from "prop-types";
import Drop from "./Drop/Drop";

const initialState = {
    name: "",
    manufacturer: "",
};

class AddForm extends React.Component {
    static propTypes = {
        addShoppingListItem: PropTypes.func,
    };

    state = initialState;

    handleChange = ev => {
        const field = {
            ...this.state,
            [ev.currentTarget.name]: ev.currentTarget.value,
        };

        this.setState(field);
    };

    handleSubmit = ev => {
        ev.preventDefault();

        if (this.state.name) {
            this.props.addShoppingListItem(this.state);

            this.setState(initialState);
            ev.currentTarget.reset();
        }
    };

    renderDropForm = () => {
        return (
            <>
                <label htmlFor="add-manufacturer">Manufacturer</label>
                <input
                    id="add-manufacturer"
                    type="text"
                    name="manufacturer"
                    value={this.state.manufacturer}
                    onChange={this.handleChange}
                />
            </>
        );
    };

    render() {
        return (
            <form className="add-form" onSubmit={this.handleSubmit}>
                <h2>Add Item</h2>
                <label htmlFor="add-name">Product</label>
                <input
                    id="add-name"
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                />
                <Drop
                    content={this.renderDropForm()}
                    trigger={{ show: "More Options", hide: "Less Options" }}
                />
                <button disabled={!this.state.name}>Add</button>
            </form>
        );
    }
}

export default AddForm;
