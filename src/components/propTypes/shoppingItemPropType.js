import PropTypes from "prop-types";

export default PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    manufacturer: PropTypes.string,
});
