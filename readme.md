## PORTAL MANAGER

### OBJECTIF

Ce projet a vu le jour en 2015 dans un format au language PHP/MySQL, à la suite d'une réflexion personnelle sur l'usage de plusieurs devices.

L'idée de le dev en NODE/REACT s'est orienté en vue de supprimer les inconvenients liés au language PHP/Mysql sur la gestion de l'app.
C'est la que ce projet est devenu mon projet de fin de formation.

La fonction principale est d'offrir un service d'accès aux liens préférés classés des utilisateurs sur multiples objets connectés (téléphones, tablettes, PC) sans paramètrer un navigateur en particulier sur chaque objet. La synchronisation entre differents browsers est compliquée voir impossible.
==> Ce projet permet d'avoir une page identique dans tous les cas quelque soit le navigateur.

Il suffit d'enregistrer les liens préférés une seule fois et de mettre en page d'accueil "/main" sur le navigateur cible.

quelques screenshots :
cf : screenshots dans le dossier.

### STATUS DU PROJET PAR MODULE

A/ Modules fonctionnels :

S'inscrire et se connecter/deconnecter

Possibilité de manager des utilisateurs en fonctions de differents paramètres :

-   ajouter un user et son dossier server
-   supprimer un user et ses dossiers personnelles (y compris server)
-   modifier certains paramètres d'un user

Gestion des bookmarks /categories par les users :

-   Ajouter un bm / categorie
-   Supprimer un bm / categorie
-   Modifier un bm / categorie
-   Attribuer ou supprimer une categorie pour un bm

Piloter les Bm par des categories avec recherches associées (page principale : /main)

B/ Evolutions possibles et envisagées pour la future version :

-   Possiblités de personnaliser la page
-   Personnaliser le moteur de recherches (Google par defaut) dans la barre de recherche
-   Ajouter des modules NetAtmo API pour la meteo locale/mondiale
-   Faire un suivi par log des actions users pour une meilleurs visualisation des actions en cas de dépannages par un admin
-   Ajouter une messagerie interne (type messenger)

### INSTALL

0/ npm install après clone ou pull (back et front)
1/ Paramétrer la base SQL à l'aide du fichier database.sql present dans le dossier racine /sql/database.sql
2/ Paramétrer les variables d'environnements dans le fichier .env a la racine du back comme suit :

```javascript
LOCAL_PORT = 9000

TOKEN_SECRET = 8pRJqBvuN6xQRCEXE9UdzaTFn9QkGAUW

DB_HOST = (IP) ou (HOST) de la bdd (si local : localhost)
DB_NAME = portal_manager
DB_USER = (user db)
DB_PWD = (password db)
DB_PORT = 3306 ou 3307 (3307 pour mariadb)



// Les 4 variables ci dessous permettent de lier l'API google pour la validantion des comptes
// https://console.cloud.google.com/apis (nécessaire pour la validation du compte)
// sert à valider un nouveau compte (cf mailling.js dans config du backend)

CLIENTID = CLIENTID
CLIENTSECRET = CLIENT GOOGLE API
REFRESHTOKEN = REFRESH GOOGLE API
ACCESSTOKEN = TOKEN GOOGLE API
```

3/ dans package.json du front : (dossier client) - parametrer le proxy sur https://localhost: {Votre port de server selectionner dans .env} 9000 par defaut
4/ Pour les test, un utilisateur déjà présent et validé :

-   email : administrateur@admin.fr
-   pwd : administrateur

Le dossier racine est configuré pour demarrer la production prévue pour décembre 2022, je suis en train de voir pour héberger sur un server ubuntu personnalisé (paramétrés par mes soins).
