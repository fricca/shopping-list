import React from "react";
import PropTypes from "prop-types";

const initialState = {
    name: "",
    manufacturer: "",
    category: "misc",
    id: null,
};

class AddForm extends React.Component {
    static propTypes = {
        addShoppingItem: PropTypes.func,
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

        // Editing an item
        if (this.state.id) {
            this.props.updateShoppingItem(this.state);
        } else {
            // Adding an item
            if (this.state.name) {
                this.props.addShoppingItem(this.state);

                this.setState(initialState);
                ev.currentTarget.reset();
            }
        }
    };

    componentDidUpdate(prevProps) {
        // No edit item passed in -> reset existing edit item
        if (!this.props.editItem && this.state.id) {
            this.setState(initialState);
        }

        // Edit item passed in -> set state accordingly
        if (
            this.props.editItem &&
            (!prevProps.editItem ||
                this.props.editItem.id !== prevProps.editItem.id)
        ) {
            this.setState({ ...this.props.editItem });
        }
    }

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
            <form
                className="form inscroll"
                style={{ "--max-height": "65vh" }}
                onSubmit={this.handleSubmit}>
                <header className="form__header">
                    <h2 className="form__title">
                        {this.state.id ? "Edit Item" : "Add Item"}
                    </h2>
                </header>
                <div className="form__group inscroll__scroll inscroll">
                    <div className="form__item">
                        <label className="form__label" htmlFor="add-name">
                            Product
                        </label>
                        <input
                            className="form__input form__input--text"
                            id="add-name"
                            type="text"
                            name="name"
                            placeholder="Add product name"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </div>
                    <div className="form__item inscroll__scroll">
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
                    </div>
                </div>
                <div className="form__action-group">
                    <button
                        className="btn btn--primary form__action form__action--submit"
                        disabled={!this.state.name}>
                        {this.state.id ? "edit" : "Add"}
                    </button>

                    {this.state.id ? (
                        <button
                            type="button"
                            className="btn form__action form__action--reset"
                            onClick={this.props.resetEditItem}>
                            Reset
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </form>
        );
    }
}

export default AddForm;
