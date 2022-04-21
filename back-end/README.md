# API pour ECF hypnos

## Description

Dans le cadre de ma formation chez Studi pour le titre de graduate développeur front-end, j'ai réalisé cette application qui permet de fournir juste l'API pour gérer les entitée d'une chaine hotelière.

## Installation en local

Ce projet est réalisé à partir de symfony.
Pour le récupérer, effecutez les commandes suivantes (dans votre console, en vous plaçant sur le dossier de travail dans lequel vous voulez importer le projet, et en prenant soin d'installer git sur votre machine)

```bash
git init
```
```bash
git clone https://github.com/kevin-macquat/ECF-hypnos.git
```

Listez et vérifiez que vous êtes bien placés sur la branche master

```bash
git branch
```

Vérifier que vous êtes bien placés dans le dossier ECF-hypnos/back-end pour et installer les dépendances de l'API:

```bash
cd ECF-hypnos/back-end
```
```bash
composer install
```

//Pour les accés à la base de données, soit vous utilisez la base de données distante qui contient déjà des //données (le projet est configuré de base come ceci), soit vous pouvez utiliser une bdd en local. Il faut //alors commenter la ligne 27 du .env et décommenter la ligne 26 puis crééer la base de donnée avec

créer la base de donnée

```bash
php bin/console doctrine:database:create
```

puis éxécuter les migrations à l'aide de

```bash
php bin/console doctrine:migrations:migrate
```

Ensuite alimenter la base de donnée en lançant les fixtures :

```bash
php bin/console doctrine:fixtures:load
```

Vous pouvez alors lancer le serveur symfony avec :

```bash
php -S localhost:3001 -t public
```

Losque votre navigateur ouvrira une nouvelle page en localhost, ajoutez /api/hotels (L'une des url en accès publique) à l'url pour accéder au gestionnaire de l'API => api platform.

on peut générer un token et ainsi vérifier le fonctionement de JWT en faisant une requête POST à l'adresse https://127.0.0.1:8000/api/login, en ajoutant dans le body en format JSON:

```bash
{
  "email":"admin@admin.com",
  "password":"admin"
}
```

Cette API est destiné à l'application front-end dans ECF-hypnos/front-end.