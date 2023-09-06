import { fetchUser, getActivity } from "@/lib/actions/users.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Image } from "next/image";

const Page = async () => {
  const user = await currentUser();

  // Clerk will redirect to sign-in page automatically
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link id={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-class">
                  <Image
                    src={activity.author.image}
                    alt="Profile Picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  ></Image>
                </article>
              </Link>
            ))}{" "}
          </>
        ) : (
          <p>No activity yet</p>
        )}
      </section>
    </section>
  );
};

export default Page;
