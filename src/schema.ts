export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    # Entry point for graphs client can execute, gate keeper
    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }

    #  Mutation for data modification
    type Mutation {
        deleteGame(id: ID!): [Game]
        addGame(game: GameContent!): Game
        updateGame(id: ID!, edits: EditGame): Game
    }

    input GameContent {
        title: String!
        platform: [String!]!
    }

    input EditGame {
        title: String
        platform: [String!]
    }
`