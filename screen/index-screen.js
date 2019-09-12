import React, {Component} from 'react';
import {View} from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { facebookLogin } from "../actions";
import {AsyncStorage} from "react-native";

class IndexScreen extends Component {

    componentDidMount() {
        //connexion fb
        AsyncStorage.getItem("fbtoken").then( token => {
            if (token) {
                //Si token deja existant vers Search
                this.goToSearch()
            }else {
                //Pas de token et Si reussi alors vers Search
                this.props.facebookLogin(this.goToSearch)
            }
        })
    }

    goToSearch = () => {
        this.props.navigation.push("Search")
    }
    render() {
        return (
            <View/>
        );
    }
}

const mapToStateToProps = state => {
    return {};
};

const mapDispatchToProps = {
    facebookLogin
};

export default withNavigation(connect(mapToStateToProps, mapDispatchToProps)(IndexScreen));