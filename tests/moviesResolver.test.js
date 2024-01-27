const { createMovie, deleteMovie, editMovie } = require('../graphql/resolvers/movies');
const Movie = require('../models/Movie');


jest.mock('../models/Movie');

describe('Movie Resolvers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  describe('createMovie', () => {
    it('should create a new movie', async () => {
      const mockInput = {
        name: 'Test Movie',
        description: 'This is a test movie description'
      };

      Movie.prototype.save.mockResolvedValueOnce({
        id: 'mocked_movie_id',
        name: mockInput.name,
        description: mockInput.description,
        createdAt: new Date().toISOString(),
        thumbsDown: 0,
        thumbsUp: 0
      });

      const result = await createMovie({}, { movieInput: mockInput });

      expect(result.id).toBe('mocked_movie_id');
      expect(result.name).toBe(mockInput.name);
      expect(result.description).toBe(mockInput.description);

    });
  });


  describe('deleteMovie', () => {
    it('should delete the specified movie', async () => {

      Movie.deleteOne.mockResolvedValueOnce({ deletedCount: 1 });

      const result = await deleteMovie({}, { ID: 'mocked_movie_id' });

      expect(result).toBe(true);
    });
  });

  describe('editMovie', () => {
    it('should edit the specified movie', async () => {

      Movie.updateOne.mockResolvedValueOnce({ modifiedCount: 1 });

      const result = await editMovie({}, { ID: 'mocked_movie_id', movieInput: { name: 'Updated Movie', description: 'Updated description' } });

      expect(result).toBe(true);
    });
  });
});
