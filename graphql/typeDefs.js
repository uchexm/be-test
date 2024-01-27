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
  user(id: ID!): User
}

type Mutation {
  createMovie(movieInput: MovieInput): Movie!
  deleteMovie( ID: ID!): Boolean
  editMovie(ID: ID!, movieInput: MovieInput ): Boolean
  registerUser(registerInput: RegisterInput): User
  loginUser(loginInput: LoginInput): User
}


type User {
  username: String
  email: String
  password: String
  token: String
}

input RegisterInput {
  username: String
  email: String
  password: String
  confirmPassword: String
}

input LoginInput {
  email: String
  password: String
}
`