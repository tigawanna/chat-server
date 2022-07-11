import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { ObjectType } from 'type-graphql';
import { Field } from 'type-graphql';


@ObjectType()
export class User {
  @Field(()=>String,{nullable:false})
  id: ObjectId;

  @Field(()=>String,{nullable:false})
  @Property({ })
  name: string;

  @Field(()=>String,{nullable:false})
  @Property({unique:true})
  email: string;


}
const schemaOptions = { schemaOptions: { timestamps: { createdAt: true ,} } };
//@ts-ignore
export const UserModel = getModelForClass(User,schemaOptions);