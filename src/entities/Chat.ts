import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { ObjectType } from 'type-graphql';
import { Field } from 'type-graphql';
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'



@ObjectType()
export class Chat {
  @Field()
  id:string;

  @Field()
  message:string;
  
  @Field()
  time:Date;
}






const ChatSchema = new mongoose.Schema({
  _id: {type:ObjectId,auto:true},
  message: {type:String},
  createdAt: {type:Date},
  updatedAt: {type:Date}  

},{timestamps:true}
);

ChatSchema.plugin(mongoosePaginate);
export const ChatModel = mongoose.model('Chat',ChatSchema);



// const schemaOptions = { schemaOptions: { timestamps: { createdAt: true ,} } };
// //@ts-ignore
// export ChatModel = getModelForClass(Chat,schemaOptions);
