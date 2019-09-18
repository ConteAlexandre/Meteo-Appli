//Voivi notre fichier de services pour envoyer des notifications sur notre téléphone vie l'api

//Nous importons des paquets propres à expo car ils sont déjà prêt à l'emploi
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

//Le package axios nous permet de communiquer avec des requêtes http
import axios from "axios";

//Voici notre fonction qui va établir la procédure à faire poru recevoir les notifications au lancement de
// l'applicatioon et avec le token de l'utilisateurs
export const subscribeToPushNotification = () => {

    //Ici on fait appel a getAsync pour récupérer les données stocker donc le token, et on lui précise que on va s'en
    // servir pour faire les notifications sur l'application
    Permissions.getAsync(Permissions.NOTIFICATIONS)

        //Ensuite on voit si sur l'appareil les notifications sont autorisées
        .then( existingPermissions => {

            //Si elles ne sont pas autorisé
            if (existingPermissions.status !== "granted" ) {

                //Alors on fait une demande si la prsonne veut recevoir les notifications
                Permissions.askAsync(Permissions.NOTIFICATIONS)

                    //Si la réponse est différentes de ok
                    .then(permission => {
                        if (permission.status !== "granted" ) {

                            //Alors on renvoi rien
                            return;

                            //Sinon on suit la procédure exacte
                        } else {

                            //Avec getExpoPushTokenAsync on envoie du coup les notifications à l'utilisateur
                            // possédant ce token
                            Notifications.getExpoPushTokenAsync().then( token => {
                                console.log("le token :", token)

                                //Ici on fait la requête http pour demande à l'api d'envoyer la notification telle
                                // qu'elle est définie chez elle
                                axios.get("https://notificationss-test.herokuapp.com/?token="+token).then( axiosResponse => {
                                    console.log("La réponse :", axiosResponse.data)
                                })
                            })
                        }
                    })

                //Si les notification sont acceptées déjà d'office alors on ne fait pas de demande et on envoie
                // directement les notifications
            } else {
                Notifications.getExpoPushTokenAsync().then( token => {
                    console.log("le token :", token)

                    //Requete htpp pour appeler l'api node qui contient le contenu des notfications avec sa configuration
                    axios.get("https://notificationss-test.herokuapp.com/?token="+token).then( axiosResponse => {
                        console.log("La réponse :", axiosResponse.data)
                    })
                })
            }
        })
}