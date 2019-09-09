import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from "react-navigation";
import { getForecastWeatherByCity } from "../actions";


class AdvencedDetails extends Component {

    componentDidMount() {
        const city = this.props.navigation.getParam("city");
        this.props.getForecastWeatherByCity(city);
    }


    render() {
        return (
            <View/>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = {getForecastWeatherByCity};


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AdvencedDetails));