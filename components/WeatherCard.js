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


//Ici nous commençons à définir notre composant
class WeatherCard extends Component {

    //Ici on détermine les états par défaut et leurs valeurs
    constructor(props) {
        super(props);

        //Voici deux états, panResponder qui nous permet de savoir si il y a des gestes sur l'ecran est donc par défaut
        // définit sur nondéfini car nous ne touchons pas l'écran dès la mise en route
        // , et isOpen qui est par défaut false car nous ne voulons par la voir dès la mise en route de l'api
        this.state = { panResponder: undefined, isOpen: false };

    }

    //Ceci est une mémthode qui nous permet de monter le composant qui suivra dans le render et de suivre les mises à
    //jour que subira les différents états
    componentDidMount() {

        //Ceci nous permettra de revenir à la position initiale quand on on fait un retour
        this.onFocusListener = this.props.navigation.addListener(
            "willFocus",
            payload => {
                this.setResetPosition(() => this.setState({isOpen: false}))
            }
        )

        //On définit un état position qui prendra les valeurs XY de l'écran
        this.position = new Animated.ValueXY()

        //Ici on détermine du coup les valeurs initiales de la WeatherCard en utilisant setValue et en précisant x et y
        this.position.setValue({x: CARD_INITIAL_POSITION_X, y: CARD_INITIAL_POSITION_Y})

        //On définit une constante qui va nous permettre de rendre les animations sur l'écran possible
        const panResponder = PanResponder.create({

            //En mettant cette méthode, on autorise le mouvement de doigt sur l'écran
            onStartShouldSetPanResponder: () => true,

            //Cette méthode nous permet de définir une réinitialisation de la WeatherCard si elle est supérieur à
            // notre constante DRAG_ZONE_WHEN_OPEN
            onPanResponderMove: (e, gesture) => {

                //Si la WeatherCard est ouverte et si notre mouvement de doigt est supérieur à la zone de trainé
                // prédéfinie
                if (!(this.state.isOpen && gesture.y0 > DRAG_ZONE_WHEN_OPEN))

                    //Alors on applique les positions qui suit
                this.position.setValue({

                    //Ici nous définissons donc les valeurs que la WeatherCard doit prendre lorsqu'on la bouge
                    x: CARD_INITIAL_POSITION_X,
                    y: gesture.moveY
                })
            },

            //Cette méthode défini l'action qui se passe lorsqu'il y a plus aucun contact avec l'écran, ceci signifie
            // souvent que l'action est réussie
            onPanResponderRelease: (e, gesture) => {

                //Si la WeatherCard est ouverte
                if (!this.state.isOpen) {

                    //et si notre mouvement sur l'écran est inférieur ou égal à notre hauteur pour détecter
                    // si la WeatherCard il faut l'ouvrir compltèment
                    if (gesture.moveY <= TRESHOLD_TO_TOP) {

                        //Alors on modifie notre état isOpen en true et donc la WeatherCard est ouverte entièrement
                        this.setOpenPosition(() => this.setState({ isOpen: true}))

                        //Sinon
                    }else {

                        //On remet la WeatherCard en position initiale
                        this.setResetPosition()
                    }

                    //Sinon
                }else {

                    //Si notre mouvement sur l'écran est inférieur à notre hauteur pour détecter si la WeatherCard est
                    // fermée ou non
                    if (gesture.moveY <= TRESHOLD_TO_BOTTOM) {

                        //Alors on la laisse ouverte entièrement grâce à notre fonction établi en dessous setOpenPosition
                        this.setOpenPosition()

                        //Sinon
                    } else {

                        //Si notre lorsque l'on relache notre WeatherCard la position y est inférieur
                        // à notre zone de trainé
                        if (gesture.y0 < DRAG_ZONE_WHEN_OPEN) {

                            //Alors on remet la WeatherCard en position initial avec setResetPosition et
                            // on redéfini l'état isOpen en false
                            this.setResetPosition(() => this.setState({isOpen: false}))
                        }
                    }
                }
            }
        })

        //Ici nous disons que tout nos états doit suivre la constante panResponder
        this.setState({ panResponder })

    }

    //Voici notre fonction qui dit comment doit se comporter la WeatherCard si elle est ouverte
    setOpenPosition = (done) => {

        //En mettant Animated.spring on configure le comportement
        Animated.spring(this.position, {

            //On lui dit que la position récupère les valeurs suivantes
            toValue: { x: CARD_INITIAL_POSITION_X, y: CARD_OPEN_POSITION}

            //Ne pas oublier le .start qui permet de lancer le processus et de définir notre paramètre comme une fonction
        }).start( () => done && done())
    }

    //Voici la fonction qui explique comment se comporter avec une resetPosition
    setResetPosition = (done) => {

        //Animated.spring nous permet de configurer cette position
        Animated.spring(this.position, {

            //Donc on établit les valeurs que doit prendre x et y avec les constantes définient plus haut
            toValue: { x: CARD_INITIAL_POSITION_X, y: CARD_INITIAL_POSITION_Y}

            //ET ne pas oublier le .start pour lancer le processus
        }).start(() => done && done())
    }

    //Voici notre fonction qui nous permettre de naviguer sur un autre écran qui est Détail
    gotoDetails = () => {

        //On dit que notre propréiété navigation doit nous emmener (.push) vers l'autre écran et comme paramètre
        // on lui dit que c'est la nom de la ville dans la propriété currentWeather
        this.props.navigation.push("Detail", { city : this.props.currentWeather.name } )
    }

    //Voici une méthode qui nous permet de faire un rendu de notre WeatherCard, l'aperçu final
    renderHandler() {

        //On fait appel a return pour bien spécifier que c'est un visuel que l'on veut
        return (

            //Ici on utilise View qui correspond au div en temps normal
            <View
                style={{justifyContent: "center", alignItems: "center"}}
            >
                {/*Ici Text correspond à la balise p */}
                <Text style={{ fontSize: 30, marginTop: hp("1%")}}>

                    {/*Ici pour donner le nom de la ville, on fait appel à notre propriété qui contient toutes
                    les informations globales*/}
                    {this.props.currentWeather.name}
                </Text>
                <View style={{flexDirection: "row"}}>
                    <Text style={{ marginTop: hp("1%"), fontSize: 35}}>

                        {/*Pour faire afficher la température, on a du utilise une formule de conversion car on
                        utilise une application qui donne des kelvins*/}
                        {kelvinToCelcius(this.props.currentWeather.main.temp) + "°C" }
                    </Text>

                    {/*Image coorespond à la balise img et nous permet de faire afficher l'icone qui correspond au
                    temps actuel de la ville recherchée*/}
                    <Image style={{ height: 60, width: 60}} source={{uri: `${ICON_URL}${this.props.currentWeather.weather[0].icon}.png`}}/>
                </View>

                {/* Ici nous donnons le rendu des détails que nous cherchons a avoir en plus pour la ville comme
                humidité ou la vitesse du vent et cela respecter la conqition sur si l'état isOpen est vrai
                grâce à this.state.isOpen */}
                {this.state.isOpen && this.renderMoreDetail()}
            </View>
        )
    }

    //Voici notre méthode pour afficher les détails récupérer par l'API
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

                {/*Voici notre composant bouton qui va nous permettre de naviguer vers la page détail grâce
                à son paramètre onPress*/}
                <Button
                    containerStyle={{marginTop: hp("3%"), width: wp("80%")}}
                    onPress={this.gotoDetails}
                    title={"Voir les 5 jours suivants"}
                />
            </View>
        )
    }

    //Et voici notre rendu global sur notre téléphone, ce n'est que cette méthode qui est appelé sur l'appareil
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

//On intègre la méthode withNavigation pour permettre d'utiliser la navigation entre les différents écrans
export default withNavigation(WeatherCard);