import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { ObjectType } from 'type-graphql';
import { Field } from 'type-graphql';
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

@ObjectType()
export class Chat {
  @Field(()=>String,{nullable:false})
  _id: ObjectId;

  @Field(()=>String,{nullable:false})
  @Property({ })
  message: string;

  @Field()
  createdAt: Date 

  @Field()
  updatedAt: Date 

  // @Field(()=>String,{nullable:false})
  // @Property()
  // user: string;
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
