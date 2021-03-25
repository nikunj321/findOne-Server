const { PrismaClient } = require('@prisma/client')
const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs')
const path = require('path');

// importing resovsers
const hello = require('./resolvers/hello');
const user = require('./resolvers/user');
const company = require('./resolvers/company')

const resolvers = [
    hello,
    user,
    company
];

const prisma = new PrismaClient();


const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, '../schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: {
        prisma
    }
});


server
    .listen()
    .then(({ url }) => {
        console.log(`server running at ${url}`)
    });