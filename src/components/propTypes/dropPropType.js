import PropTypes from "prop-types";

export default {
    trigger: PropTypes.shape({
        show: PropTypes.node,
        hide: PropTypes.node,
    }),
    content: PropTypes.node.isRequired,
    visible: PropTypes.bool,
    classes: PropTypes.shape({
        wrap: PropTypes.string,
        trigger: PropTypes.string,
        content: PropTypes.string,
    }),
};
