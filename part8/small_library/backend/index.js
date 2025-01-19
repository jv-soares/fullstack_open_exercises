const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const uuid = require('uuid');
const mongoose = require('mongoose');
const Author = require('./models/Author');
const Book = require('./models/Book');

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

  type Query {
    dummy: Int
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
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
  },
  Mutation: {
    addBook: async (parent, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = await Author({ name: args.author }).save();
      }

      const newBook = Book({ ...args, author: author._id });
      await newBook.save();
      await newBook.populate('author');
      return newBook;
    },
    editAuthor: (parent, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (!author) return;

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((author) =>
        author.id === updatedAuthor.id ? updatedAuthor : author
      );
      return updatedAuthor;
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
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
