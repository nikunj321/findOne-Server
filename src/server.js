const { PrismaClient } = require('@prisma/client')
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const express = require('express');
const expressJwt = require('express-jwt')
const fs = require('fs')
const path = require('path');
const cookieParser = require('cookie-parser');
const { applyMiddleware } = require('graphql-middleware')

const permisssions = require('./auth/isAuth');

// importing resovsers
const hello = require('./resolvers/hello');
const user = require('./resolvers/user');
const company = require('./resolvers/company');
const { verify } = require('jsonwebtoken');
const { issueAccessToken } = require('./utils/accessRefresh');

const resolvers = [
    hello,
    user,
    company
];

const typeDefs = fs.readFileSync(
    path.join(__dirname, '../schema.graphql'),
    'utf8'
);

const prisma = new PrismaClient();
const port = 4000;
const app = express();
app.use(cookieParser());
app.post("/refresh_token", async (req, res) => {
    // console.log(req.cookies);
    const token = await req.cookies.jid;
    if (!token) {
        res.send({
            ok: false,
            accessToken: ""
        })
    }
    let payload = null;
    // that means we got a token 
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            accessToken: ""
        })
    }

    /**
     * if we made it so far means we have valid token
     * and we can issue new Access Token
     */

    const newCompany = await prisma.company.findUnique({
        where: {
            id: payload.id
        }
    });

    if (!newCompany) {
        res.send({
            ok: false,
            accessToken: ''
        })
    }

    const sendToken = {
        id: newCompany.id,
        name: newCompany.name,
    }

    res.send({
        ok: true,
        accessToken: issueAccessToken(sendToken)
    })
});

/**
 * extract information from the "Authorization" Header
 * and return payload as "user"
 * which we have implemented in "Context"
 */
app.use(expressJwt({
    secret: process.env.ACCESS_TOKEN_SECRET,
    credentialsRequired: false,
    algorithms: ["HS256"]
}))


const server = new ApolloServer({
    schema: applyMiddleware(
        makeExecutableSchema({ typeDefs, resolvers }),
        permisssions
    ),
    context: ({ req }) => {
        const user = req.user || null;
        return { prisma, user };
    }
});



server.applyMiddleware({ app });

app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});

