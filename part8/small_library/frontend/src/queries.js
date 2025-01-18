import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      id
      bookCount
      born
      name
    }
  }
`;
