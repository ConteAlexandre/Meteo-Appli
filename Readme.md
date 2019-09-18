# Apllication Mobile effectué avec React-Native et Redux : La Météo

## Technologies utilisées :

* Npm
* React-Native et différents de ces packages
* Expo
* Package axios

## Explication sur le fonctionnement de l'application

Cette application permet de connaître la météo de la ville recherchée, mais pour cela il faut avant
se connecter via l'application Login de Facebook ou sinon vous n'y aurez pas accès. Puis une fois
la ville trouvé, vous avez une Carte qui s'affiche en bas avec la température actuelle, mais si vous 
cherchez à l'étendre vers le haut, alors vous verrez plus de détails et même un bouton pour voir 
sur les 5 prochains jours. Une fois sur l'écran Détail, vous avez deux graphiques qui apparaissent,
 un pour les températures et un autre pour le % d'humidité, et pour revenir à l'écran précédent 
 vous avez un bouton.
 
 ## Démarche à effectué pour faire fonctionner l'application sur votre ordinateur et téléphone
 
* Avant toute chose, il faut que vous installez l'application Expo sur votre téléphone
* Ensuite, vous faite la commande suivante : 
````
git clone git@github.com:ConteAlexandre/Meteo-Appli.git dans le dossier que vous voulez
````
* Une fois cela fait, vous allez dans le dossier et vous faites : 
````
npm install
````
Ceci permettra d'intaller tout les modules nécéssaires à l'application
* Puis pour lancer l'application, il vous faut exécuter la commande suivante :
````
npm start
````
* Ensuite, soit vous le lancer sur un émulateur android que vous avez lancer avant, pour faire cela vous avez sur votre
navigateur une page qui s'est ouverte permettant de lancer diverses choses dont celle ci.
* Si vous souhaitez la lancer directement sur votre téléphone, ce que je conseil pour avoir les notifications qui fonctionnent,
 il suffit de suivre cette procédure :
 ````
* Lancez l'application expo depuis votre téléphone
* Une fois cela fait, soit vous avez un compte et vous vous connectez, soit vous
cliquez sur la case QRCode et vous scannez le code qui est apparu sur votre navigateur
* Une fois ces procédures respectées alors vous allez avoir la compilation
qui va se faire, plus ou moins long.
````
* Et voila l'application est lancée et fonctionnelle sur votre téléphone

## Mise en place du système de notifications
Vous avez l'application d'installée, mais les notifications ne fonctionnent pas encore car il
vous manque un autre répertoire. Pour ce faire voici comment faire :
* Pour trouver le répertoire correspondant, il vous faut suivre le lien suivant : [Notification](https://github.com/ConteAlexandre/notifications-expo)
* Ensuite effectuer un git clone sur ce répertoire
* Effectuer la commande
````
npm install
````
* Il faut déployer ce module en ligne pour que les notif fonctionnent, personnellement je l'ai fait 
sur [Heroku](https://id.heroku.com/login) mais vous êtes libre d'en choisir un autre
* une fois cela fait, vous devez allez dans le fichier 'notifications' sur votre application, il se trouve
dans le dossier 'services', et le nom de l'app qui se situe dans l'url de 'axios.get' il vous faut le changer par
le votre.
* Voila votre système de notifications est opérationnel.

## Conclusion
Ceci est ma première application mobile et aussi la première fois que je fais du React-Native,
donc si vous voyez des choses qui vous choquent ou à améliorer n'hésitez pas à me le dire. 




