import mongoose from "mongoose";
const myMongoose: any = mongoose;
const communitySchema = new myMongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  createdBy: {
    type: myMongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  threads: [
    {
      type: myMongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  members: [
    {
      type: myMongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Community =
  myMongoose.models.Community || myMongoose.model("Community", communitySchema);

export default Community;
