

// Union type
// When you define a union type, you declare which object types are included in the union:
// union SearchResult = Book | Author
// type Book {
//   title: String!
// }

// type Author {
//   name: String!
// }

// type Query {
//   search(contains: String): [SearchResult!]
// }



// interface
// An interface specifies a set of fields that multiple object types can include:
// interface Book {
//   title: String!
//   author: Author!
// }

const userTypeDefs = `#graphql
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
  scalar timestamptz
  type User {
    _id: ID!
    email: String!
    firstName: String
    lastName: String
    password: String
    phoneNumber: String
    token: String
  }



  type UserMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User 
  }  

  input CreateUserInput {
    email: String!
    firstName: String!
    lastName: String
    password: String!
    phoneNumber: String
  }
 
  input UpdateUserInput {
    email: String
    firstName: String
    lastName: String
    phoneNumber: String
  }



type Query {
  getUser(id: ID!): User
}
 type Mutation {
    createUser(input: CreateUserInput): UserMutationResponse
    login(email: String!, password: String!): UserMutationResponse
    updateUser(id: ID!, input: UpdateUserInput): UserMutationResponse
    deleteAccount(id: ID!): UserMutationResponse
   }
`

module.exports = {
  userTypeDefs,
}
