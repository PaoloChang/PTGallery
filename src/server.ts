require('dotenv').config();
import http = require('http');
import express = require('express');
import * as logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import client from './client';
import { typeDefs, resolvers } from './schema';
import { getUser, protectedResolver } from './users/users.utils';

const PORT = process.env.PORT;

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (params) => {
        if (params.req) {
            const { req: { headers }} = params
            return {
                loggedInUser: await getUser(headers.token),
                client,
                protectedResolver,
            };
        }
        else if (params.connection) {
            const { connection: { context }} = params;
            return {
                loggedInUser: await getUser(context.token),
                client,
                protectedResolver
            }
        }
    },
    /** Without using connection property */
    // subscriptions: {
    //     onConnect: async (params) => {
    //         if (!params) {
    //             throw new Error("You can't listen.");
    //         }
    //         const token = Object.values(params)
            
    //         const loggedInUser = await getUser(token[0]);
    //         return {
    //             loggedInUser
    //         }
    //     }
    // }
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}/graphql ✅`)
})