# scaleapp

## Overview

An Node.js/Angular project which represents a simple application which visualize interviewing questions.

## Technologies

The project is developed using the following technologies:

- docker
- Node.js
- Angular + Angular cli

## Input CSV file structure

A `.xlsx` file should be provided. The file consist by different areas of questions. Each questions' area is represented by a different sheet within the `.xlsx` file. Every sheet should have the following column structure:

- `category` - so you can diferenciate between different groups of questions within the same area. For example area: `Java`, categories: `String, Arrays, Exceptions`, etc.
- `complexity`- represents the different levels of complexity for every single questions. Supported values are integer values which are showed by particular label to the user. `data-schemas/complexity-schema.json` file contains all supported values and lavels. By default we have values: `0,1,2,3,4` with the following labels: `Fundamental, Easy, Standard, Advanced, Master` accordingly
- `question`
- `answer`

The name of every single sheet is considered as a separate area for this group of questions.

The `.xlsx` file should be placed under: `./questions-etl/input-data` directory.
All the areas, categories and complexity sets should be described within `./data-schemas/area_with_categories-schema.json` and `./data-schemas/complexity-schema.json` accordingly. Pay attention for the typos. Every single type is potential thread for unexpected behavior within the search engine of the system. 
No validation is provided since this should be done only on file structure change, which happens relatively rarely.

## Local setup

In order to bring the environment up you just need to execute the following command from the root directory of the project:

``` sh
. ./init.local-env.sh
```

From another terminal you should execute the following command in order to load all questions to the database
``` sh
cd questions-etl
npm run local
```
You can enter the system on the following [web address](http://localhost:4200/)

## Dev environment setup

In order to bring the environment up you just need to execute the following command:

``` sh
docker-compose up -d --build
```

You can access the application on the following [web address](http://localhost:4242/)

## Modules

### ETL tool

From root folder please execute the following commands

``` sh
npm install # only first time or after modules change
npm run local
```

### Server (REST API)

``` sh
npm install # only first time or after modules change
npm run local
```

`start`	Does the same as 'npm run serve'. Can be invoked with npm start
`build`	Full build. Runs ALL build tasks (build-sass, build-ts, lint, copy-static-assets)
`serve`	Runs node on dist/server.js which is the apps entry point

[Swagger-endpoint](http://localhost:3000/api-docs)

Endpoints

- `curl localhost:3000/api/questions/random?count=1`
- `curl localhost:3000/api/questions/search?area=java&category=Basics&complexity=0&key=jvm`
- `curl localhost:3000/api/areas`
- `curl localhost:3000/api/complexities`

### Web Application

``` sh
npm install
npm install -g @angular/cli@8.3.5 # first time only
ng serve
```

You can access the application on the following [web address](http://localhost:4200/)
