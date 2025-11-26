const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { typeDefs, resolvers } = require("./schema/schema");

// MongoDB connection URI
const DB_URI = "mongodb+srv://siddarthareddy:<db_password>@cluster0.zpsef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Initialize Apollo Server with type definitions and resolvers
const apolloServer = new ApolloServer({ typeDefs, resolvers });

// Connect to MongoDB and then start the Apollo Server
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB successfully");
        return apolloServer.listen({ port: 5001 });
    })
    .then(({ url }) => {
        console.log(`GraphQL API is live at ${url}`);
    })
    .catch((error) => {
        console.error(`MongoDB connection failed: ${error.message}`);
    });
