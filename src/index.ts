// @ts-check
import 'reflect-metadata'
import express  from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { subscribe } from 'graphql';
import { execute } from 'graphql';
import mongoose  from 'mongoose';
import {buildSchema} from 'type-graphql'
import { ChatResolver } from './resolvers/ChatResolver';
import { UserResolver } from './resolvers/UserResolver';
import MyContext from './types';
import cors from 'cors';



(async () => {
  const PORT = 4000;
  const app = express();

  const allowedOrigins = ['http://localhost:3000',
  'http://localhost:3001',
  'https://studio.apollographql.com'];
  const corsOptions = {
  credentials: true,
    origin: function(origin, callback){
     if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }
  
  app.use(cors(corsOptions))  
  const httpServer = createServer(app);
  // const schema = makeExecutableSchema({ typeDefs,resolvers:[catResolvers,PostResolver,UserResolver]});

  const schema=await buildSchema({
    resolvers:[UserResolver,ChatResolver],
    validate:false
})
  
  const server = new ApolloServer({
    schema,
    context:({req,res}):MyContext=>({req,res})
  })
  await server.start().catch(e=>{console.log("error starting server===== ",e)})
  server.applyMiddleware({ app });

  var uri = "mongodb://localhost:27017/chat";
  //@ts-ignore
//   mongoose.connect(uri,function(){
//     /* Drop the DB */
//     mongoose.connection.db.dropDatabase();
// });

  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(()=>console.log("connected to newmango db"))


  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }

  );

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });


})().catch(e=> console.log('error on server ====== ',e))