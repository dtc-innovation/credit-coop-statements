# credit-coop-statements

> Téléchargement des relevés bancaires [Coop@net][] associations et entreprises en CSV, sans cliquer.
> En attendant que le Crédit Coopératif fournisse une API et encourage le "zéro papier".

L'intention est de planifier les téléchargements via Travis CI et/ou une tâche cron. La seconde étape serait d'ajouter les nouvelles lignes à une feuille de calcul pour procéder au rapprochement bancaire.


# Installation

```js
npm i -g @dtc-innovation/credit-coop-statements
```

# Utilisation

À faire éloigné des regards indiscrets (et des caméras de surveillance) :

```js
export BANK_PASSWORD="..."
```

Puis lancer le script :

```js
credit-coop-statements --username="S4xxxx9D" --account-id="410xxxxxxxx4"
```

# Licence

[MIT](./LICENSE)

[Coop@net]: https://www.coopanet.com/
