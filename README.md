# Thailand's Politics and Business 
[![Netlify Status](https://api.netlify.com/api/v1/badges/83666036-80b0-483e-be7d-31d113f350d0/deploy-status)](https://app.netlify.com/sites/admiring-ride-6b1173/deploys)

<div style="center">
    <a href="https://elect.in.th/politics-and-business/"><img src="https://i.imgur.com/VbvGDhs.png"/></a>
</div>

## Description
The goal of this visualization is to reveal business activities of each politician. From the visualisation, one can see the relationships between political parties and companies that support them. Moreover, integrating with Thailand's government spending data allows us to see the connections between producement campaigns and those companies.

We hope this project has demonstated the importance of open data and paved the foundation towards the country's political transparency.

## Development
Development of this project contains 2 parts: 1) Data Preparation and 2) Web and Visualisation development.

<div style="center">
    <img src="https://i.imgur.com/GyAUUn1.png"/>
</div>

### Requirements
- Node.js(v11.x)

### Install dependencies
```$ npm install```

## Run development server
```$ npm run start```

## Deployment 
|Environment|URL|Command|
|---|---|---|
|Staging|[link](https://master--admiring-ride-6b1173.netlify.com)| automatic deployment for *master* branch|
|Production|[link](https://elect.in.th/politics-and-business/)| `$ scripts/deploy.sh prod`|

### Site Statistics
TBD.


## Acknowledgements
- This project is built on top of [Webpack & React - Skeleton](https://github.com/keathley/webpack-react-skeleton).
- We appreciate help from [Creden.co](https://creden.co) and Thailand's [Digital Government Development Agency (DGA)](https://www.dga.or.th) for providing us APIs and increasing request allowance.
- [ELECT](https://elect.in.th)'s members and [Room 508 Podcast](https://www.facebook.com/room508podcast/) team for early feedback and suggestions.