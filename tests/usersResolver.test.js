const resolvers = require('../graphql/resolvers');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-errors');

jest.mock('../models/User', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('User resolvers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user', async () => {
      const registerInput = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const newUser = {
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedPassword',
        token: 'someToken',
      };


      User.findOne.mockResolvedValueOnce(null);


      bcrypt.hash.mockResolvedValueOnce('hashedPassword');


      jwt.sign.mockReturnValueOnce('someToken');


      User.create.mockResolvedValueOnce(newUser);

      const result = await resolvers.Mutation.registerUser(null, { registerInput });

      expect(result.id).toBe('123');
      expect(result.username).toBe('testuser');
      expect(result.email).toBe('test@example.com');
      expect(result.token).toBe('someToken');
      expect(User.create).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedPassword',
      });
    });

    it('should throw an error if user already exists', async () => {

      User.findOne.mockResolvedValueOnce({ username: 'existingUser' });

      await expect(resolvers.Mutation.registerUser(null, {
        registerInput: {
          username: 'existingUser',
          email: 'existing@example.com',
          password: 'password123',
        },
      })).rejects.toThrow(ApolloError);
    });
  });
});
