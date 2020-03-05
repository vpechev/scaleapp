# Bring up instances of MongoDB and its UI
echo 'Starting DB'
docker-compose up -d mongo mongo-express

# Start server
echo 'Starting server'
npm run local --prefix ./server/ &

# Start Front-end
echo 'Starting Web'
npm run start-local --prefix ./web/


