const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');

const jwt = require('jsonwebtoken');

const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions');

const DataLoader = require('dataloader');
const authorBookCountLoader = new DataLoader(async (authorIds) => {
  const books = await Book.find({ author: { $in: authorIds } });
  const getBookCountByAuthorId = (authorId) => {
    return books.filter((book) => book.author.equals(authorId)).length;
  };
  return authorIds.map(getBookCountByAuthorId);
});

const pubsub = new PubSub();

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: async () => Book.countDocuments({}),
    authorCount: async () => Author.countDocuments({}),
    allBooks: async (parent, args) => {
      const filter = {};
      if (args.genre) {
        filter.genres = args.genre;
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          filter.author = author._id;
        } else {
          return [];
        }
      }

      return Book.find(filter).populate('author');
    },
    allGenres: async () => {
      const allBooks = await Book.find({});
      const genres = new Set();
      for (const book of allBooks) {
        for (const genre of book.genres) {
          genres.add(genre);
        }
      }
      return [...genres];
    },
    allAuthors: async () => Author.find({}),
    me: (parent, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (parent, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        try {
          author = await Author({ name: args.author }).save();
        } catch (error) {
          throw new GraphQLError('error while creating author', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      try {
        const newBook = Book({ ...args, author: author._id });
        await newBook.save();
        await newBook.populate('author');
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook });
        return newBook;
      } catch (error) {
        throw new GraphQLError('error while adding book', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }
    },
    editAuthor: async (parent, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const updatedAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );
      if (!updatedAuthor) {
        throw new GraphQLError('author not found', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name },
        });
      }
      return updatedAuthor;
    },
    createUser: async (parent, args) => {
      const password = 'hardcoded';
      const user = await User({ ...args, password }).save();
      return {
        id: user._id,
        username: user.username,
        favoriteGenre: user.favoriteGenre,
      };
    },
    login: async (parent, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username, password });
      if (!user) {
        throw new GraphQLError('invalid username or password', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET
      );
      return { value: token };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator(['BOOK_ADDED']),
    },
  },
  Author: {
    bookCount: async (parent) => authorBookCountLoader.load(parent.id),
  },
};

module.exports = resolvers;
