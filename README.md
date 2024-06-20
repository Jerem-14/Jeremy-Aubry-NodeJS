DS Node




![image](https://github.com/Jerem-14/Jeremy-Aubry-NodeJS/assets/94076111/7a0ac29f-af2b-4add-8236-ddfbe3d4d22b)

![image](https://github.com/Jerem-14/Jeremy-Aubry-NodeJS/assets/94076111/57c46f0c-2706-4892-9c3a-5e4c8b9f5488)


2. Optimisations MongoDB/Atlas (2 pts)
Optimisation pour améliorer le ‘search’ par nom de flipper :

Créer un index textuel sur le champ nom de la collection flippers.
Exemple : db.flippers.createIndex({ nom: "text" })
Optimisation pour accélérer la présentation en liste des flippers sur la home page :

Créer un index combiné sur les champs marque_id et annee.
Exemple : db.flippers.createIndex({ marque_id: 1, annee: -1 })
