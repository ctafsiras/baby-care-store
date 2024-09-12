"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Label } from "./ui/label";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/api/auth";

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function RegisterForm() {
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await register(data);
    if (res.data?.userId && res.data?.message) {
      router.push("/login");
      toast({
        title: "Account Created Successfully!",
        description: "You can now log in and start exploring.",
      });
    } else {
      toast({
        title: res.error?.data?.error!,
        description: "Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center py-4 space-x-2">
          <Checkbox
            checked={agree}
            onClick={() => setAgree(!agree)}
            className="size-5"
          />
          <Label>I agree to the terms and conditions</Label>
        </div>
        <Button disabled={!agree || isLoading} className="w-full" type="submit">
          {isLoading ? "Registering..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
