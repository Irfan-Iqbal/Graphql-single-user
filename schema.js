const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { userTypeDefs } = require("./typeDefs/user")
const userResolvers = require("./resolvers/user")

const typeDefs = mergeTypeDefs([
  userTypeDefs,
])
const resolvers = mergeResolvers([
  userResolvers,
])

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

module.exports = {
  schema,
}
