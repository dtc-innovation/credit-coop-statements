# credit-coop-statements

> Téléchargement des relevés bancaires mensuels en CSV, sans cliquer.
> Parce que c'est honteux que le Crédit Coopératif n'aie pas d'API, limite les relevés à 3 mois et fasse payer au-delà.

L'intention est de planifier les téléchargements via Travis CI et/ou une tâche cron. La seconde étape serait d'ajouter les nouvelles lignes à une feuille de calcul pour procéder au rapprochement bancaire.


# Installation

```js
npm i -g github:dtc-innovation/credit-coop-statements
```

# Utilisation

À faire éloigné des regards indiscrets (et des caméras de surveillance) :

```js
export BANK_USERNAME="S4xxxx9D"
export BANK_PASSWORD="..."
export BANK_ACCOUNT_ID="410xxxxxxxx4"
```

Puis lancer le script :

```js
credit-coop-statements
```
