const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const supertest = require('supertest');

const MONGODB = "mongodb+srv://nwakauc1:1234@cluster0.h0tfuab.mongodb.net/?retryWrites=true&w=majority";
const typeDefs = require('../graphql/typeDefs');
const resolvers = require('../graphql/resolvers/index');


const { server } = require('../index');

let app;

beforeAll(async () => {

  await mongoose.connect(MONGODB, { useNewUrlParser: true });
  console.log('MongoDB connected successfully');


  app = await server.start();
});

afterAll(async () => {

  await mongoose.connection.close();
  await server.stop();
});

describe('Apollo Server Tests', () => {
  it('should connect to the Apollo Server', async () => {

    const response = await supertest(app)
      .get('/graphql')
      .expect(200);


    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('client', null);
  });
});
