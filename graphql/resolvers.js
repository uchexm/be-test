const Movie = require('../models/Movie');

module.exports = {
  Query: {
    async movie(_, { ID }) {
      return await Movie.findById(ID)
    },
    async getMovies(_, { amount }) {
      return await Movie.find().sort({ createdAt: -1 }).limit(amount)
    }

  },
  Mutation: {
    async createMovie(_, { movieInput: { name, description } }) {
      const createdMovie = new Movie({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsDown: 0,
        thumbsUp: 0
      })
      const res = await createdMovie.save(); // save to mongoDB

      return {
        id: res.id,
        ...res._doc
      }
    }

  }
}