require("dotenv").config();
import http = require("http");
import express = require("express");
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import client from "./client";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./users/users.utils";

interface tokenType {
  token: string;
}

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (params) => {
    if (params.req) {
      const {
        req: { headers },
      } = params;
      return {
        loggedInUser: await getUser(headers.token),
        client,
        protectedResolver,
      };
    } else if (params.connection) {
      const {
        connection: { context },
      } = params;
      return {
        loggedInUser: context.loggedInUser,
        client,
        protectedResolver,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }: tokenType) => {
      if (!token) {
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/graphql ✅`);
});
