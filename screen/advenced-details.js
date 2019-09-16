//Voici notre fichier qui nous afficher l'écran Détail sur notre appareil

//Nous importons le package React pour utilise les composants de react-native
import React, {Component} from 'react';

//Importation des composants de react-native
import { View, Text } from 'react-native';

//On importe ici le package connect pour pouvoir utiliser la librairies redux
import { connect } from 'react-redux';

//Ici le composant withNavigation pour pouvoir changer d'ecran
import { withNavigation } from "react-navigation";

//Importation des actions que l'on utilisera
import { getForecastWeatherByCity } from "../actions";

//Ce package la nous permet d'afficher un graphique sur notre écran
import { LineChart } from "react-native-chart-kit";

//Importation de composant pour définir les tailles en % et permettre une responsivité plus fluide
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

//Notr fonction de transformation de kelvin en celcius
import { kelvinToCelcius } from "../services/temperature";

//Importation de l'élément Bouton
import {Button} from "react-native-elements";

//Commençons la définissions de notre composant
class AdvencedDetails extends Component {

    //Cette méthode permet de récupérer et de transmettre la mise à jour des différents états ou propriétés qui interviendront
    componentDidMount() {
        const city = this.props.navigation.getParam("city");
        this.props.getForecastWeatherByCity(city);
    }

    //Méthode pour récupérer la température de la ville
    getTemperature() {

        //Ici on utilise la propriété forecastWeather définit plus bas avec map pour pouvoir lire un tableau en javascript
        return this.props.forecastWeather.list.map( weather => {

            //Ensuite on applique la fonction de conversion pour récupérer en celcius
            return (kelvinToCelcius(weather.main.temp))
        })
    }

    //Méthode pour récupérer l'humidité
    getHumidity() {
        return this.props.forecastWeather.list.map( weather => {
            return (weather.main.humidity)
        })
    }

    //Méthode pour définir des labels pour notre graphique, label qui se trouveront en bas
    getLabels() {

        //Ici on nous donnons deux paramètres à map, le premier _ signifie que l'on ne s'occupe pas du premier argument
        // demandé, et en appelant index on dit que l'on s'occupe la généralité qui est dt quand on regarde sur le Debugger
        return this.props.forecastWeather.list.map((_, index) => {

            //On dit que la constante day est utilisable que dans cette fonction
            let day = index / 8;

            //Ensuite on dit de retourner si index est égal à 0 alors écrire t et sinon à chaque résultat qui équivaut
            // à 0 par une division de 8 alors on met t+ et on rajoute le nombre obtenu
            return index === 0 ?  "t" : index % 8 === 0 ? "t+" + day + "j" : ""
        })
    }

    //Ceci est notre méthode qui nous fait revenir sur l'écran précédent
    goBack = () => {

        //Grâce à react-navigation, on a déjà une fonction qui nous permet de revenir directement qui est goBack()
        this.props.navigation.goBack();
    }

    //Voici notre méthode qui nous rend un graphique général et qui depend ensuite de ce que l'on met à la place de data
    renderChart(data){
        return (
            <LineChart
                data={{

                    //Ici on utilise notre fonction getLabels
                    labels: this.getLabels(),
                    datasets: [{
                        data
                    }]
                }}
                width={wp("90%")} // from react-native
                height={hp("30%")}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        )
    }

    //Voici la méthode qui va nous transmettre visuellement les deux graphiques un pour la
    // températures et un pour l'humidité
    renderCharts() {
        return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 30, paddingTop: hp("1%")}}>
                    {this.props.forecastWeather.city.name} sur 5 Jours
                </Text>
                <Text style={{ marginBottom: hp("2%"), marginTop: hp("2%"), fontSize: 20 }}>
                    Graph Température en °C
                </Text>

                {/*Ici on utilise notre méthode de rendu général mais en précisant que c avec la méthode température*/}
                {this.renderChart(this.getTemperature())}
                <Text style={{ marginBottom: hp("2%"), fontSize: 20 }}>
                    Graph Humidité
                </Text>

                {/*Ici on utilise notre méthode de rendu général mais en précisant que c avec la méthode humidité*/}
                {this.renderChart(this.getHumidity())}
                <Button onPress={this.goBack} title={"Retour"} containerStyle={{marginTop: hp("1%"), width: wp("90%")}}/>
            </View>
        )
    }

    //Voici la méthode de rendu sur notre écran
    render() {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                {this.props.forecastWeather ? this.renderCharts() : <Text>Loading...</Text>}
            </View>
        );
    }
}

//Grâce à la librairies de redux, nous pouvons maper une propriétés via un état et comme cela l'état ne changer pas et
// on peut le réutilise autre part
const mapStateToProps = state => {
    return {
        //On établit ici le nom de notre propriété et le fait que ça corresond à un état d'une action.payload
        forecastWeather : state.weather.ForecastWeather
    };
};

//Ici nous établissons avec quel action utilise cette propriété
const mapDispatchToProps = {getForecastWeatherByCity};


//Exportons mainteant ce composant tout en disant que ça utilise la librairies redux et navigation pour permettre
// de changer d'ecran
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AdvencedDetails));