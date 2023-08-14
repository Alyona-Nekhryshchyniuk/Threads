"use client";

import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/lib/validations/user";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

function AccountProfile({ user, btnTitle }: Props) {
  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      proofile_photo: "",
      name: "",
      userName: "",
      bio: "",
    },
  });

  return <Form></Form>;
}

export default AccountProfile;
