const { ApolloServer } = require('apollo-server');

const mongoose = require('mongoose');

const MONGODB = "mongodb+srv://nwakauc1:1234@cluster0.h0tfuab.mongodb.net/?retryWrites=true&w=majority";


const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/movies');
const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
  console.log('MongoDb connected successfully');
  return server.listen({ port: 5000 });
})
  .then((res) => {
    console.log(`Server listening on ${res.url}`);
  });