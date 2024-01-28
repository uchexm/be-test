require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');
const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected successfully');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server listening on ${res.url}`);
  });
