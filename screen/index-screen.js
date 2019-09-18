//Voici notre fichier qui établi quel écran on voit en premier lorsqu'on lance l'api pour la première fois

//Importation du paquet React pour pouvoir utiliser les composants react-native
import React, {Component} from 'react';

//Importation des composants react-native
import {View, AsyncStorage} from "react-native";

//Importation du paquet connect pour pouvoir utilise la librairie redux
import { connect } from "react-redux";

//withNavigation pour pouvoir naviguer sur les différents écrans de l'api
import { withNavigation } from "react-navigation";

//Importation de notre composant facebooklogin
import { facebookLogin, setToken } from "../actions";


//Commençons notre composant
class IndexScreen extends Component {

    //Nous commençons par définit les états à recevoir avec leurs mises a jour et le comportement
    componentDidMount() {
        //connexion fb,
        AsyncStorage.getItem("fbtoken").then( token => {
            if (token) {

                //On stocke notre token dès que l'api est lancé même si éjà connecter
                this.props.setToken(token)

                //Si token deja existant vers Search
                this.goToSearch()

            }else {

                //Pas de token et Si reussi alors vers Search
                this.props.facebookLogin(this.goToSearch)
            }
        })
    }

    //Définition de la fonction qui nous envoi vers l'écran de recherche de ville
    goToSearch = () => {
        this.props.navigation.push("Search")
    }

    //Meme si le rendu est vierge il le faut pour la bonne procédure de l'api car sans ça elle ne sera
    // pas comment rendre le rendu
    render() {
        return (
            <View/>
        );
    }
}

//
const mapToStateToProps = state => {
    return {};
};

//Ici quel action va intéragir avec nos états et propriétés de cet écran
const mapDispatchToProps = {
    facebookLogin,
    setToken
};

//On exporte le tout, avec withNavigation pour permettre le switch d'ecran et connect pour utilise la librairies redux
export default withNavigation(connect(mapToStateToProps, mapDispatchToProps)(IndexScreen));