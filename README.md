# scaleapp
an Node.js/Angular project which represents a simple application which visualize interviewing questions.

## Modules

### ETL tool

From root folder please execute the following commands

``` sh
npm install # only first time or after modules change
node ./src/questions-etl.js
```

### Server

``` sh
npm install # only first time or after modules change
npm run dev
```

start	Does the same as 'npm run serve'. Can be invoked with npm start
build	Full build. Runs ALL build tasks (build-sass, build-ts, lint, copy-static-assets)
serve	Runs node on dist/server.js which is the apps entry point

[Swagger-endpoint](http://localhost:3000/api-docs)

Endpoints

- curl localhost:3000/questions/random?count=1