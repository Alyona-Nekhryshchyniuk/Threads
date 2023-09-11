import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThreadCardActions from "./ThreadCardActions";
import { currentUser } from "@clerk/nextjs";

interface Props {
  key: string;
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: { name: string; image: string; id: string };
  community: { id: string; name: string; image: string } | null;
  createdAt: string;
  comments: {
    autor: { image: string };
  }[];
  isComment?: boolean;
  // setEdit?: () => void;
}
const ThreadCard = async ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  // setEdit,
}: Props) => {
  const user = await currentUser();
  return (
    <article
      className={`flex  w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>
            {/* <ThreadCardContent content={content} edit={edit}/> */}
            <p className="mt-2 text-small-regular text-light-2">{content}</p>;
            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <ThreadCardActions
                id={id}
                currentUserId={user?.id || ""}
                // setEdit={setEdit}
              />
            </div>

            {comments.length > 0 && (
              <Link href={`/thread/${id}`}>
                <p className="mt-3 text-subtle-medium text-gray-1">
                  {`${comments.length} ${
                    comments.length > 1 ? "replies" : "reply"
                  }`}
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          {" "}
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} — {community.name} Community
          </p>
          <Image
            src={community.image}
            width={14}
            height={14}
            alt={community.name}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
};

export default ThreadCard;