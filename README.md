# scaleapp
an Node.js/Angular project which represents a simple application which visualize interviewing questions.


npm install i -g csvtojson

cd ./server/input-data

csvtojson input-data/Java.csv > convertedJavaResult.json

echo 'var documents = ' > Java.js && cat convertedJavaResult.json >> Java.js && echo 'db.Java.insert(document);' >> Java.js

mongo localhost:27017/scaleapp Java.js
