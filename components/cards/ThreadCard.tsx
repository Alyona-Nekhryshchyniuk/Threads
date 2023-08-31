import React from "react";

interface Props {
  key: string;
  id: string;
  currentUserId: string;
  parentId: string | null;
  constent: string;
  author: { name: string; image: string; id: string };
  community: { id: string; name: string; image: string } | null;
  createdAt: string;
  comments: {
    autor: { image: string };
  }[];
  isComment?: boolean;
}
const ThreadCard = ({
  key,
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
}: Props) => {
  return (
    <article className="text-small-regular text-light-2">
      <h2>{content}</h2>
    </article>
  );
};

export default ThreadCard;
