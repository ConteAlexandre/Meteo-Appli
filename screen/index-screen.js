import React, {Component} from 'react';
import {View, Text} from "react-native";
import { connect } from "react-redux";

class IndexScreen extends Component {

    componentDidMount() {
        //Pas de token
        //connexion fb
        //Si reussi alors vers Search
        //Si token deja existant vers Search
    }

    render() {
        return (
            <View>

            </View>
        );
    }
}

const mapToStateToProps = state => {
    return {};
};

const mapDispatchToProps = {};

export default connect(mapToStateToProps, mapDispatchToProps)(IndexScreen);