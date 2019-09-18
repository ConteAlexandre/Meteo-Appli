//Voici notre écran lorsque la connexion avec Facebook est un succes

//Importation de React pour pouvoir utilise react-native
import React, {Component} from 'react';

//Importation des composants de react-native
import { View } from 'react-native';

//Ce composant nous permet d'avoir un visuel d'une map
import MapView from "react-native-maps";

//Ceci est un composant pour nous permettre d'effectuer une recherche dans un input
import {SearchBar} from "react-native-elements";

//Composant pour ajouster la hauteur et largeur en % et avoir une responsivité plus fluide
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

//Importation du composant connect pour utilise la librairies redux
import {connect} from "react-redux";

//Importation de notre action qu'on utilisera pour cet écran
import {getCurrentWeatherByCity} from "../actions";

//Importation de notre WeatherCard
import WeatherCard from "../components/WeatherCard";

//Coordonnées par défaut pour nous mettre sur une ville par défaut lors de l'affichage de l'ecran
const DEFAULT_COORD = {
    lat: 48.859268,
    lng: 2.347060
}

//Commençons notre composant
class SearchScreen extends Component {

    //Définissons les états, il y en qu'un seul car seulement search sera modifie lorsque l'on commencera à taper une ville
    state = {search: ""}

    //Fonction qui nous permet de modifir en instant notre état
    updateSearch = search => {
        this.setState({ search })
    }

    //Fonction qui fait la soumission une fois que l'on a valide notre recherche
    submitSearch = () => {

        //On fait appel à notre action sous forme de propriété car elle sera amené à être modifié
        this.props.getCurrentWeatherByCity(this.state.search);

        console.log(this.state.search);
    }

    //Voici la méthode rendu global pour afficher cela sur notre appareil
    render() {

        console.log(this.props.currentWeather)

        return (
            <View style={{flex: 1}}>

                {/*Ici nous faisons appel à notre composant MapView pour pouvoir avoir un visuel de la map et
                nous lui donnons des paramètres*/}
                <MapView
                    style={{flex: 1 }}
                    region={{
                        latitude: this.props.currentWeather ? this.props.currentWeather.coord.lat : DEFAULT_COORD.lat,
                        longitude: this.props.currentWeather ? this.props.currentWeather.coord.lon : DEFAULT_COORD.lng,
                        latitudeDelta: 0.2000,
                        longitudeDelta: 0.1000,
                    }}
                    scrollEnabled={false}
                    liteMode={true}
                />

                {/*Ici nous disons que si la propriété currentweather est existante alors tu affiche la WeatherCard avec
                comme paramètres la valeur rentrée dans search*/}
                {this.props.currentWeather && <WeatherCard currentWeather={this.props.currentWeather}/>}
                <SearchBar
                        lightTheme
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                        onSubmitEditing={this.submitSearch}
                        placeholder={"Ecrit la ville ..."}
                        containerStyle={{
                            position: "absolute",
                            bottom: hp("50%"),
                            left: wp("5%"),
                            width: wp("90%")
                        }}
                    />
            </View>
        );
    }
}

//Ici on fait appel à la librairie redux pour pouvoir attibuer un état à une propriété
const mapStateToProps = (store) => {
    return {

        //On nomme la propriété et on lui dit a quel état cela correspond
        currentWeather: store.weather.CurrentWeather
    }
}

//Cette constante nous permet de communiquer les actions à la librairies et du coup de pouvoir les
// utiliser comme on le souhaite
const mapDispatchToProps = {
    getCurrentWeatherByCity
}

//Nous exportons le tout et n'oublions pas de mettre connect pour dire que 'on utilise la librairies de redux
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)

