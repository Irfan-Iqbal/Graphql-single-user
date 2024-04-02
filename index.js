const { ApolloServer } = require("apollo-server");
const { schema } = require("./schema");
require("./DB");

const PORT = 9999;
const server = new ApolloServer({
  schema,
});

async function startServer() {
  server.listen(PORT).then(({ url }) => {
    console.log(`Server is running at: ${url}`);
  });
}

startServer().catch((error) => {
  console.error("Error occurred during server startup:", error);
});
