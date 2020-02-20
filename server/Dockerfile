FROM node:10.15.0 as prodbuild

WORKDIR /app
COPY ./server/package.json /app
RUN npm install
RUN npm install -g --force nodemon
COPY ./server /app
# should be changed in real PROD
COPY ./config /config 

FROM nginx
EXPOSE 80
COPY --from=prodbuild /app/build /usr/share/nginx/html
