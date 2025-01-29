import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const ALL_GENRES = gql`
  query AllGenres {
    allGenres
  }
`;

export const FAVORITE_GENRE = gql`
  query Me {
    me {
      favoriteGenre
    }
  }
`;
