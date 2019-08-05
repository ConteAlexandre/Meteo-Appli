import React, {Component} from 'react';
import { Animated, View, Text, PanResponder } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const CARD_INITIAL_POSITION_Y = hp("80%");
const CARD_INITIAL_POSITION_X = wp("5%");

class WeatherCard extends Component {

    constructor(props) {
        super(props);

        this.state = { panResponder: undefined };

    }

    componentDidMount() {
        this.position = new Animated.ValueXY()
        this.position.setValue({x: CARD_INITIAL_POSITION_X, y: CARD_INITIAL_POSITION_Y})
        panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gesture) => {
                this.position.setValue({
                    x: CARD_INITIAL_POSITION_X,
                    y: gesture.moveY
                })
            }
        })
        this.setState({ panResponder })

    }

    render() {
        return (
            this.state.panResponder ?
                <Animated.View {...this.state.panResponder.panHandlers} style={{width: wp("90%"),
                    height: hp("110%"),
                    borderRadius: 10,
                    zIndex: 2,
                    backgroundColor: "white",
                    elevation: 1,
                    shadowColor: "black",
                    shadowOpacity: 0.2,
                    shadowOffset: { height: 2, width: 2},
                    position: "absolute",
                    left: CARD_INITIAL_POSITION_X,
                    padding: hp("2%"),
                    ...this.position.getLayout()
                }}
                />
                : <View/>);
    }
}

export default WeatherCard;