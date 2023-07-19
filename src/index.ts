import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js'

// db
import db from './_db.js';

const { games, authors, reviews } = db;

const resolvers = {
    Query: {
        reviews: ()=> reviews,
        review: (_, args) => reviews.find((review) => review.id === args.id),
        games: ()=> games,
        game: (_, args) => games.find((game) => game.id === args.id),
        authors: ()=> authors,
        author: (_, args) => authors.find((author) => author.id === args.id)
    },
    Game: {
        reviews: (parent) => reviews.filter((review) => review.game_id === parent.id)
    },
    Author: {
        reviews: (parent) => reviews.filter((review) => review.author_id === parent.id)
    },
    Review: {
        game: (parent) => games.find((game) => game.id === parent.game_id),
        author: (parent) => authors.find((author) => author.id === parent.author_id),
    },

    Mutation: {
        deleteGame: (_, args) => {
            return games.filter((game) => game.id !== args.id)
        },
        addGame: (_, args) => {
            let newGame = { ...args.game, id: games.length + 1 }
            games.push(newGame)
            return newGame;
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log(`🚀  Server ready at: ${url}`);