import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/users.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  console.log("We are in CREEEATTTE  PAGGGEEE");
  const user = await currentUser();

  // Clerk will redirect to sign-in page automatically
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");
  console.log(typeof userInfo._id);
  console.log(userInfo._id.toString());
  console.log(userInfo._id);
  let u = userInfo._id.toString();
  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={u} />
    </>
  );
}

export default Page;
