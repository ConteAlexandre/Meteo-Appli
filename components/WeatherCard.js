import React, {Component} from 'react';
import { Animated, View, Text, PanResponder } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const CARD_INITIAL_POSITION_Y = hp("80%");
const CARD_INITIAL_POSITION_X = wp("5%");
const TRESHOLD_TO_TOP = hp("75%");
const TRESHOLD_TO_BOTTOM = hp("70%");
const CARD_OPEN_POSITION = hp("45%")
const DRAG_ZONE_WHEN_OPEN = hp("65%")

class WeatherCard extends Component {

    constructor(props) {
        super(props);

        this.state = { panResponder: undefined, isOpen: false };

    }

    componentDidMount() {
        this.position = new Animated.ValueXY()
        this.position.setValue({x: CARD_INITIAL_POSITION_X, y: CARD_INITIAL_POSITION_Y})
        panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gesture) => {
                if (!(this.state.isOpen && gesture.y0 > DRAG_ZONE_WHEN_OPEN))
                this.position.setValue({
                    x: CARD_INITIAL_POSITION_X,
                    y: gesture.moveY
                })
            },
            onPanResponderRelease: (e, gesture) => {
                if (!this.state.isOpen) {
                    if (gesture.moveY <= TRESHOLD_TO_TOP) {
                        this.setOpenPosition(() => this.setState({ isOpen: true}))
                    }else {
                        this.setResetPosition()
                    }
                }else {
                    if (gesture.moveY <= TRESHOLD_TO_BOTTOM) {
                        this.setOpenPosition()
                    } else {
                        if (gesture.y0 < DRAG_ZONE_WHEN_OPEN) {
                            this.setResetPosition(() => this.setState({isOpen: false}))
                        }
                    }
                }
            }
        })
        this.setState({ panResponder })

    }

    setOpenPosition = (done) => {
        Animated.spring(this.position, {
            toValue: { x: CARD_INITIAL_POSITION_X, y: CARD_OPEN_POSITION}
        }).start( () => done && done())
    }

    setResetPosition = (done) => {
        Animated.spring(this.position, {
            toValue: { x: CARD_INITIAL_POSITION_X, y: CARD_INITIAL_POSITION_Y}
        }).start(() => done && done())
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