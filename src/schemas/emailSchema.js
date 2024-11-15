const { gql } = require('apollo-server');

const emailTypeDefs = gql`
  type Query {
    healthCheck: String
  }

  type Mutation {
    sendEmail(
      fromEmail: String!
      fromName: String!
      toEmail: String!
      toName: String!
      subject: String!
      textPart: String
      htmlPart: String
    ): String
  }
`;

module.exports = emailTypeDefs;

