import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';


class AdvencedDetails extends Component {
    render() {
        return (
            <View/>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = {};


export default connect(mapStateToProps, mapDispatchToProps)(AdvencedDetails);