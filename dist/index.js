"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const apollo_server_express_1 = require("apollo-server-express");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const graphql_1 = require("graphql");
const graphql_2 = require("graphql");
const mongoose_1 = __importDefault(require("mongoose"));
const type_graphql_1 = require("type-graphql");
const ChatResolver_1 = require("./resolvers/ChatResolver");
const UserResolver_1 = require("./resolvers/UserResolver");
const cors_1 = __importDefault(require("cors"));
(async () => {
    const PORT = 4000;
    const app = (0, express_1.default)();
    const allowedOrigins = ['http://localhost:3000',
        'http://localhost:3001',
        'https://studio.apollographql.com'];
    const corsOptions = {
        credentials: true,
        origin: function (origin, callback) {
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    };
    app.use((0, cors_1.default)(corsOptions));
    const httpServer = (0, http_1.createServer)(app);
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [UserResolver_1.UserResolver, ChatResolver_1.ChatResolver],
        validate: false
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res })
    });
    await server.start().catch(e => { console.log("error starting server===== ", e); });
    server.applyMiddleware({ app });
    var uri = "mongodb://localhost:27017/chat";
    mongoose_1.default.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log("connected to newmango db"));
    subscriptions_transport_ws_1.SubscriptionServer.create({ schema, execute: graphql_2.execute, subscribe: graphql_1.subscribe }, { server: httpServer, path: server.graphqlPath });
    httpServer.listen(PORT, () => {
        console.log(`🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`);
        console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`);
    });
})().catch(e => console.log('error on server ====== ', e));
//# sourceMappingURL=index.js.map