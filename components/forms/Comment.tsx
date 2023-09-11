"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";

import { CommentValidation } from "../../lib/validations/thread";
import Image from "next/image";
import { addCommentToThread, editComment } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
  // x?: string;
  // edit: boolean;
}

const Comment = ({
  threadId,
  currentUserImg,
  currentUserId,
  // edit,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: ""
    },
  });


  // useEffect(()=>{
 // if(pathname.includes('edit=')){
 // setValue('comment', updatedCommentContent)
//  setFocus()}
  // }, [pathName])

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
     // if(pathname.includes('edit=')){
      // ? await editComment(
      //     threadId,
      //     values.thread,
      //     JSON.parse(currentUserId),
      //     pathname
      //   )
      // : 
      await addCommentToThread(
          threadId,
          values.thread,
          JSON.parse(currentUserId),
          pathname
        );

    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="Profile image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus outline-none text-light-1"
                  name='comment'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
