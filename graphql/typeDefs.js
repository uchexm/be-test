const { gql } = require('apollo-server');

module.exports = gql`
type Movie {
  name: String
  description: String
  createdAt: String
  thumbsDown: Int
  thumbsUp: Int
}

input MovieInput {
  name: String
  description: String
}

type Query {
  movie(ID: ID!): Movie!
  getMovies(amount: Int): [Movie]
}

type Mutation {
  createMovie(movieInput: MovieInput): Movie!
  deleteMovie( ID: ID!): Boolean
  editMovie(ID: ID!, movieInput: MovieInput ): Boolean
}
`