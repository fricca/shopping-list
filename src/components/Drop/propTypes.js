import PropTypes from "prop-types";

export default {
    trigger: PropTypes.shape({
        show: PropTypes.node,
        hide: PropTypes.node,
    }),
    visible: PropTypes.bool,
    classes: PropTypes.shape({
        wrap: PropTypes.string,
        trigger: PropTypes.string,
        content: PropTypes.string,
    }),
    toggleFunc: PropTypes.func,
};
