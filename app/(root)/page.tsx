// "use clients";

//app/page.tsx
// import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { fetchPosts } from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/threadCard/ThreadCard";

export default async function Home() {
  const result = await fetchPosts(1, 10);

  const user = await currentUser();
  return (
    <div>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-9">
        {result.posts.length === 0 ? (
          <p>No threads found</p>
        ) : (
          result.posts.map((post) => (
            <ThreadCard
              key={post._id}
              id={post._id}
              currentUserId={user?.id || ""}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
              // isComment
            />
          ))
        )}
      </section>
    </div>
  );
}
