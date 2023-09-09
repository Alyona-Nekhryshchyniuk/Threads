"use client";
import { MouseEvent, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { addLikeToThread, getLikesAmount } from "@/lib/actions/thread.actions";

interface ElWithAttr extends EventTarget {
  id?: string;
}

const ThreadCardActions = ({
  id,
  currentUserId,
}: {
  id: string;
  currentUserId: string;
}) => {
  const [like, setLike] = useState(false);
  const [likesQuantity, setlikesQuantity] = useState("");

  useEffect(() => {
    getLikesAmount(id, currentUserId).then(({ amount, likedAlready }) => {
      setlikesQuantity(amount);
      setLike(likedAlready);
      console.log("GG-----s");
    });
  }, []);

  const clickHandle = async (e: MouseEvent<HTMLElement>) => {
    let targetedImg: ElWithAttr = e.target;

    if (targetedImg.id === "like") {
      setLike((prev) => !prev);

      const likesAmountinDB = !like
        ? await addLikeToThread(id, currentUserId, "inc")
        : await addLikeToThread(id, currentUserId, "dec");
      setlikesQuantity(likesAmountinDB);
    }
  };

  return (
    <div className="flex gap-3.5" onClick={clickHandle}>
      <p className="relative top-1 left-4 text-base-regular text-gray-1">
        {likesQuantity ? likesQuantity : ""}
      </p>
      <Image
        id="like"
        // src={`/assets/heart-gray.svg`}
        src={`/assets/${like ? "heart-filled" : "heart-gray"}.svg`}
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
      />
      <Link href={`/thread/${id}`}>
        <Image
          src="/assets/reply.svg"
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </Link>
      <Image
        id="repost"
        src="/assets/repost.svg"
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
      />
      <Image
        id="share"
        src="/assets/share.svg"
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
      />
    </div>
  );
};

export default ThreadCardActions;
