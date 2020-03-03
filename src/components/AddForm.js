import React from "react";
import PropTypes from "prop-types";

const initialState = {
    name: "",
    manufacturer: "",
    category: "misc",
};

class AddForm extends React.Component {
    static propTypes = {
        addShoppingListItem: PropTypes.func,
    };

    state = initialState;

    handleChange = ev => {
        const field = {
            ...this.state,
            [ev.target.name]: ev.target.value,
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

    renderCategory = category => {
        return (
            <label
                key={category.id}
                className="form__item--radio cat-select__item">
                <span className="cat-select__input">
                    <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={this.state.category === category.id}
                        onChange={this.handleChange}
                    />
                </span>{" "}
                <span className="cat-select__name">{category.name}</span>{" "}
                <span className="cat-select__symbol">{category.symbol}</span>
            </label>
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
                        <label htmlFor="add-category" className="form__label">
                            Category
                        </label>
                        <div
                            className="form__group form__group--column cat-select"
                            onChange={this.handleChange}>
                            {this.props.categories.map(category =>
                                this.renderCategory(category)
                            )}
                        </div>
                    <button
                        className="btn btn--primary form__submit"
                        disabled={!this.state.name}>
                        Add
                    </button>
            </form>
        );
    }
}

export default AddForm;
