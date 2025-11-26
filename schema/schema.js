// Importing necessary modules for GraphQL and Mongoose
const { gql } = require("apollo-server");
const { model, Schema } = require("mongoose");

// Define the Movie model using a Mongoose schema
const movieSchema = new Schema({
    title: String,
    description: String,
    runtime: Number,
    genres: [String],
    imdbScore: Number,
    ageCertification: String,
    productionCountries: [String],
    releaseYear: Number,
    type: String
});

// Create a Movie model from the schema
const Movie = model("Movie", movieSchema);

// Define GraphQL schema with types and input fields
const typeDefs = gql`
    type Movie {
        id: ID!
        title: String
        description: String
        runtime: Int
        genres: [String]
        imdbScore: Int
        ageCertification: String
        productionCountries: [String]
        releaseYear: Int
        type: String
    }

    input MovieInput {
        title: String  
        description: String
        runtime: Int
        genres: [String]
        imdbScore: Int
        ageCertification: String
        productionCountries: [String]
        releaseYear: Int
        type: String
    }

    type Query {
        getAllMovies: [Movie!]!
        getMovieByTitle(title: String!): Movie
    }

    type Mutation {
        createMovie(movieInput: MovieInput): Movie!
        updateMovieByTitle(title: String!, movieInput: MovieInput): Movie
        deleteMovieByTitle(title: String!): Boolean
    }
`;

// Define resolvers to handle GraphQL queries and mutations
const resolvers = {
    Query: {
        async getAllMovies() {
            return await Movie.find();
        },
        async getMovieByTitle(_, { title }) {
            return await Movie.findOne({ title });
        }
    },
    Mutation: {
        async createMovie(_, { movieInput }) {
            const newMovie = new Movie(movieInput);
            return await newMovie.save();
        },
        async updateMovieByTitle(_, { title, movieInput }) {
            return await Movie.findOneAndUpdate(
                { title },
                { $set: movieInput },
                { new: true }
            );
        },
        async deleteMovieByTitle(_, { title }) {
            const result = await Movie.deleteOne({ title });
            return result.deletedCount > 0;
        }
    }
};

// Export typeDefs and resolvers for use in the Apollo Server
module.exports = { typeDefs, resolvers };
