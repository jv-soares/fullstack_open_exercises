const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql');
const { startStandaloneServer } = require('@apollo/server/standalone');

const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/user');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('dotenv').config();

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to database'))
  .catch((error) => console.log(`error connecting to database: ${error}`));

const typeDefs = `
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Query {
    dummy: Int
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

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
  Author: {
    bookCount: async (parent) => Book.countDocuments({ author: parent.id }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
