import { UserInput } from "../types";
import { HydratedDocument } from "mongoose";
import { User, UserModel } from "../entities/User";
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


const NEWUSER = "NEW_USER_ADDED";

@Resolver(() => User)
export class UserResolver {

  //query all users
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await UserModel.find({});
    console.log("user returned========",users)
    return users;
  }

  
  //create new post
  @Mutation(() => User)
  async createUser(
    @Arg("input") input: UserInput,
    @PubSub(NEWUSER) publish: Publisher<User>
  ): Promise<User[]> {
    const user: HydratedDocument<User> = new UserModel({
      name: input.name,
      email: input.email,
    });
     await user.save().then(async (e) => {
      // console.log("user response====== ", e);
      await publish(e);
    });
    //@ts-ignore
    return user;
  }

//subscribe to createUser mutation 
  @Subscription({ topics: NEWUSER })
  userAdded(@Root() { id, name, email }): User {
    return { id, name, email };
  }

  
}
