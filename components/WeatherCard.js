//Voici le fichier qui définit notre carte où figure la température et autres informations sur la ville qui a été tapé

//On importe React et Component pour nous permettre d'utiliser les différentes fonction de react native
import React, {Component} from 'react';

//Voici différents objets apparatenant au package react-native et qui vont être utile au fur et à mesure
import { Animated, View, Text, PanResponder, Image } from "react-native";

//Ceci sont des composants qui nous permettet de mettre des pourcentages pour la hauteur et largeur de composants ce
//ce qui une responsivité plus pratique
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

//Ceci est une fonction importé d'un fichier local qui nous permet de faire la convertion des kelvin en celcius
import {kelvinToCelcius} from "../services/temperature";

//Importation d'un objet de react-native-element pour faire afficher un bouton
import {Button} from "react-native-elements";

//Cette fonction va nous permettre d'autoriser la navigation entre différents écrans ou interface via ce composant
import { withNavigation } from "react-navigation";

//Voici différentes constantes qui seront utilisées dans le composant et en faisant cela, on évite d'avoir des erreurs
//et on peut ensuite réutiliser où l'on veut

//Constante qui nous permet de déterminer la hauteur de la Weathercard une fois la recherche effectué
const CARD_INITIAL_POSITION_Y = hp("80%");

//Elle nous permet de définir la largeur de gauche que l'on enleve sur l'ecran pour la Weathercard de la ville
const CARD_INITIAL_POSITION_X = wp("5%");

//cette constante permet de savoir à partir de quelle hauteur on laisse la Weathercard ouverte completement
const TRESHOLD_TO_TOP = hp("75%");

//Celle ci nous permet de définir à partir de quelle hauteur la Weathercard revient à sa position initiale
const TRESHOLD_TO_BOTTOM = hp("70%");

//La constante nous permet de savoir la hauteur que prend la Weathercard lorsqu'elle est ouvrte complètement
const CARD_OPEN_POSITION = hp("45%");

//Celle ci nous permet de définir la zone à cibler pour pouvoir faire redescendre la Weathercard ou juste la bouger
const DRAG_ZONE_WHEN_OPEN = hp("50%");

//Et enfin, cette constante nous permet de définir l'url qui nous donne l'icone du temps
const ICON_URL = "http://openweathermap.org/img/w/";


class WeatherCard extends Component {

    constructor(props) {
        super(props);

        this.state = { panResponder: undefined, isOpen: false };

    }

    componentDidMount() {
        this.onFocusListener = this.props.navigation.addListener(
            "willFocus",
            payload => {
                this.setResetPosition(() => this.setState({isOpen: false}))
            }
        )
        this.position = new Animated.ValueXY()
        this.position.setValue({x: CARD_INITIAL_POSITION_X, y: CARD_INITIAL_POSITION_Y})
        const panResponder = PanResponder.create({
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

    renderHandler() {
        return (
            <View
                style={{justifyContent: "center", alignItems: "center"}}
            >
                <Text style={{ fontSize: 30, marginTop: hp("1%")}}>
                    {this.props.currentWeather.name}
                </Text>
                <View style={{flexDirection: "row"}}>
                    <Text style={{ marginTop: hp("1%"), fontSize: 35}}>
                        {kelvinToCelcius(this.props.currentWeather.main.temp) + "°C" }
                    </Text>
                    <Image style={{ height: 60, width: 60}} source={{uri: `${ICON_URL}${this.props.currentWeather.weather[0].icon}.png`}}/>
                </View>
                {this.state.isOpen && this.renderMoreDetail()}
            </View>
        )
    }

    gotoDetails = () => {
        this.props.navigation.push("Detail", { city : this.props.currentWeather.name } )
    }

    renderMoreDetail() {
        return (
            <View>
                <View style={{ alignItems: "center"}}>
                    <Text>Humidity: {this.props.currentWeather.main.humidity} %</Text>
                    <Text>Pressure: {this.props.currentWeather.main.pressure} hpa</Text>
                    <Text>Max Température: {kelvinToCelcius(this.props.currentWeather.main.temp_max)}°C</Text>
                    <Text>Min Température: {kelvinToCelcius(this.props.currentWeather.main.temp_min)}°C</Text>
                    <Text>Wind Speed: {this.props.currentWeather.wind.speed} km/h</Text>
                </View>
                <Button
                    containerStyle={{marginTop: hp("3%"), width: wp("80%")}}
                    onPress={this.gotoDetails}
                    title={"Voir les 5 jours suivants"}
                />
            </View>
        )
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
                >
                    {this.renderHandler()}
                </Animated.View>
                : <View/>);
    }
}

export default withNavigation(WeatherCard);