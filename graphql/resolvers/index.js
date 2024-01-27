const moviesResolvers = require('./movies');
const usersResolvers = require('./users');

module.exports = {
  Query: {
    ...moviesResolvers.Query,
    ...usersResolvers.Query
  },
  Mutation: {
    ...moviesResolvers.Mutation,
    ...usersResolvers.Mutation
  },
};