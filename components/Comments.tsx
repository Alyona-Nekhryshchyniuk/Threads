// "use client";
import { fetchUser } from "@/lib/actions/users.actions";
import ThreadCard from "./cards/threadCard/ThreadCard";
import Comment from "./forms/Comment";
import { redirect } from "next/navigation";
import { useState } from "react";

interface Props {
  userInfo: { image: string; _id: string };
  
  thread: {
    id: string;
    children: {
      _id: string;
      text: string;
      author: string;
      createdAt: any;
      community: any;
      parentId: string;
    }[];
  };
}

const Comments = async ({ thread, userInfo }: Props) => {
  //   const [edit, setEdit] = useState(false);
  // const userInfo = await fetchUser(userId);
  // if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <div className="mt-7">
        <Comment
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
          
          //   edit={edit}
        />
      </div>
      <div className="mt-10">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={childItem?.id || ""}
            parentId={childItem.parentId}
            // o we have edited ?  content === newcontent
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            // setEdit={setEdit}
            // if comment - allow to modify
            isComment
          />
        ))}
      </div>
    </>
  );
};

export default Comments;
