Sujet du TP : Mini gestionnaire de notes en ligne de commande + petit serveur HTTP

Vous allez créer une application capable de :
Gérer des notes dans un fichier JSON (ajout / liste).
Avoir une interface CLI simple.
Exposer les notes via un serveur HTTP minimaliste.



structure :
mini-notes/
 ├── notes.json
 ├── notes.js
 ├── server.js
 └── package.json



notes.json est un fichier JSON vide :
[]






Via CLI:
node notes.js add "Acheter du café"
node notes.js list

Via CLI NPM:
npm run notes add "Apprendre Node"
npm run serve


Via le navigateur :
Ajouter suppression d’une note.
Ajouter recherche d’une note.
Retourner un HTML lisible au lieu d’un JSON simple.
