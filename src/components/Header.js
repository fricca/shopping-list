import React from "react";

const Action = ({ children }) => {
    if (children) {
        return <div className="header__action">{children}</div>;
    }

    return null;
};

const Header = props => {
    return (
        <header className="page__header">
            <div className="header holder">
                <h1 className="header__title">Shopping List</h1>
                <Action {...props} />
            </div>
        </header>
    );
};

export default Header;
