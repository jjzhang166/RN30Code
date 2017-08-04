const React = require('react');
const ReactNative = require('react-native');
const {
    TouchableNativeFeedback
} = ReactNative;

const Button = (props) => {
    return <TouchableNativeFeedback {...props}>
        {props.children}
    </TouchableNativeFeedback>;
};

module.exports = Button;
