import PropTypes from "prop-types";

export default PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    manufacturer: PropTypes.string,
});
