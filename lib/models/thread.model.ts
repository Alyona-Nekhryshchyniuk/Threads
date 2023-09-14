import mongoose from "mongoose";
const myMongoose: any = mongoose;
const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: myMongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: myMongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: myMongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  likes: [{ type: myMongoose.Schema.Types.ObjectId, ref: "User" }],
  // likes: { type: Number, default: 0 },
});

const Thread =
  myMongoose.models.Thread || myMongoose.model("Thread", threadSchema);

export default Thread;
