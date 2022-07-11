import { Chat, ChatModel } from "../entities/Chat";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  PubSub,
  Publisher,
  Root,
  Subscription,
} from "type-graphql";
import { v4 as uuidv4 } from 'uuid';
// import { HydratedDocument } from "mongoose";



const NEWCHAT = "NEW_CHAT_ADDED";

@Resolver(() => Chat)
export class  ChatResolver {
  
  //query all users
  @Query(() => [Chat])
  //@ts-ignore
  async chats(): Promise<Chat[]> {
    // const options = {
    //   page: 1,
    //   limit: 2,
    //   collation: {
    //     locale: 'en',
    //   },
    // };
//@ts-ignore
// const chats=await ChatModel.paginate({}, options)
// console.log("holt output ======",chats)    
  return [] as Chat
}

  
  //create new post
  @Mutation(() => Chat)
  async createChat( @Arg("input") input: String, 
  @PubSub(NEWCHAT) publish: Publisher<Chat> ): Promise<Chat> {
 
  //   const chat: HydratedDocument<Chat> = new ChatModel({
  //     message: input,
  //  });
  //    await chat.save().then(async (e) => {
      // console.log("user response====== ", e);
      // await publish(e);
  //   })
    // .catch(e=>
    //  console.log("error response====== ", e)
    // )
    
  const chat={
    id:uuidv4() as string,
    message:input as string,
    time:new Date()
  }
    console.log("new chat created ==== ",chat)
    await publish(chat);
    return chat;
  }


//subscribe to createUser mutation 
  @Subscription({ topics: NEWCHAT })
  newChat(@Root() { id,message,time}): Chat {
    console.log("subscription firing ===== ",{ id, message,time})
    return { id, message,time};
  }

  
}
