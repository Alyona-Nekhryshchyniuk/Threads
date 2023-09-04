"use server";

import React from "react";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export const createThread = async ({
  text,
  author,
  communityId,
  path,
}: Params) => {
  connectToDB();

  const createdThread = await Thread.create({
    text,
    author,
    community: null,
  });

  await User.findByIdAndUpdate(author, {
    $push: {
      threads: createdThread._id,
    },
  });

  revalidatePath(path);
};

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of posts to skip
  const skipAmount = (pageNumber - 1) * pageSize;

  // Fetch the post that have no parents (top-level threads ...)
  // 'desc" in sort() - newly added posts show first
  // Method populate will replace value with just ObjectId of document from another collection (user in this case) with the whole document,
  // when we I console posts, in author field I'll see not only id of User, but the whole object of user with all its fields like bio, name
  // select, in this case, will filter the keys I really need, because, for example, bio field I don't need really, but I am fine with all others
  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  //  Comparison operanor $in (goes to Query and Projection Operators in MongoDB Docs) - Matches any of the values specified in an array.
  //  Тоесть значением поля parentId должно быть какое-ир с элементов массива, чтоб удовлитворить условие
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postsQuery.exec();
  console.log("!!!!!!!!!!!!!!!!!!!!!!!", posts);
  const isNext = totalPostsCount > skipAmount + posts.length;

  return {
    posts,
    isNext,
  };
}

export const fetchThreadById = async (id: string) => {
  connectToDB();

  try {
    // TODO: POPULATE COMMUNITY

    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          { path: "author", model: User, select: "_id id name parentId image" },
        ],
      })
      .exec();

    return thread;
  } catch (error: any) {
    throw new Error(`Error fetching thread ${error.message}`);
  }
};

export const addCommentToThread = async (
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) => {
  connectToDB();

  try {
    // TODO: POPULATE COMMUNITY

    const originalThread = await Thread.findById(threadId);

    if (!originalThread) throw new Error("Thread not found");

    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    const savedCommentThread = await commentThread.save();

    originalThread.children.push(savedCommentThread._id);

    await originalThread.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to thread ${error.message}`);
  }
};
