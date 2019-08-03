import React, {Component} from 'react';
import { Animated, View, Text, PanResponder } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

class WeatherCard extends Component {

    render() {
        return (
            <Animated.View style={{width: wp("90%"),
                height: hp("110%"),
                borderRadius: 10,
                zIndex: 2,
                backgroundColor: "white",
                elevation: 1,
                shadowColor: "black",
                shadowOpacity: 0.2,
                shadowOffset: { height: 2, width: 2},
                position: "absolute",
                left: wp("5%"),
                padding: hp("2%")}}/>
        );
    }
}

export default WeatherCard;