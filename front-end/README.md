# ECF hypnos

## Description :

Dans le cadre de ma formation chez Studi pour le titre de graduate développeur front-end, j’ai eu à exécuter le développement d’une application, une chaine hotellière(fictives). Nous pouvons, selon le rôle atribué, gérer les hotels, les chambres et les utilisateurs.

## installation en local front-end:

Ce projet est réalisé à partir de react pour le front-end et en symfony pour le back-end.
le back-end et le front-end sont chaqu'un regroupé dans le dossier du même nom placé à la racine du projet.
Pour le récupérer, effecutez les commandes suivantes (dans votre console, en vous plaçant sur le dossier de travail dans lequel vous voulez importer le projet, et en prenant soin d'installer git sur votre machine)
```bash
  git init
```
```bash
  git clone https://github.com/kevin-macquat/ECF-hypnos.git
```

Vérifier que vous êtes bien placés sur la branche master

```bash
  git branch
```

Vérifier que vous êtes bien placés dans le dossier ECF-hypnos/front-end pour installer les dépendances react :

```bash
  cd ECF-hypnos/front-end
```
```bash
  npm install
```

Ce site va récupérer les données d'une API. Vous devez donc aussi installer et gérer l'api en local. Il faudra alors modifer la ligne 2 du fichier front-end/src/features/fetchApi.js, pour y mettre l'adresse de base de l'API en local (exemple http://localhost:3001).

Maintenant vous pouvez lancer l'application avec :

```bash
  npm start
```