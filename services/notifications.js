//Voivi notre fichier de services pour envoyer des notifications sur notre téléphone vie l'api

//Nous i
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import axios from "axios";

export const subscribeToPushNotification = () => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
        .then( existingPermissions => {
            if (existingPermissions.status !== "granted" ) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(permission => {
                        if (permission.status !== "granted" ) {
                            return;
                        } else {
                            Notifications.getExpoPushTokenAsync().then( token => {
                                console.log("le token :", token)
                                axios.get("https://notificationss-test.herokuapp.com/?token="+token).then( axiosResponse => {
                                    console.log("La réponse :", axiosResponse.data)
                                })
                            })
                        }
                    })
            } else {
                Notifications.getExpoPushTokenAsync().then( token => {
                    console.log("le token :", token)
                    axios.get("https://notificationss-test.herokuapp.com/?token="+token).then( axiosResponse => {
                        console.log("La réponse :", axiosResponse.data)
                    })
                })
            }
        })
}