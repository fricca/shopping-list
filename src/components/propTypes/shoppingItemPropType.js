import PropTypes from "prop-types";

export default PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    manufacturer: PropTypes.string,
    category: PropTypes.string,
    bought: PropTypes.bool,
    lastBought: PropTypes.number,
    count: PropTypes.number,
});
