const User = require('../../models/User');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  Query: {
    user: (_, { ID }) => User.findById(ID)


  },
  Mutation: {
    async registerUser(_, { registerInput: { username, password, email } }) {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        throw new ApolloError(`User ${oldUser.username} already exists`);
      }

      var encryptedPassword = await bcrypt.hash(password, 10);


      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,

      })

      const token = jwt.sign({
        user_id: newUser._id, email
      }, "JWT_STRING", {
        expiresIn: "2h"
      });

      newUser.token = token;

      const res = await newUser.save()
      return {
        id: res.id, ...res._doc
      };
    },
    async loginUser(_, { loginInput: { password, email } }) {
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({
          user_id: newUser._id, email
        }, "JWT_STRING", {
          expiresIn: "2h"
        });

        user.token = token;
        return {
          id: user.id,
          ...user._doc
        }


      } else {
        throw new ApolloError('Incorrect password/email');
      }

    }

  }
};