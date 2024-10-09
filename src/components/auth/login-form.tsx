"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/api/auth";
import { useAppDispatch } from "@/redux/hooks";
import { login as loginToken } from "@/redux/slice/user";

const FormSchema = z.object({
  email: z.string().email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const fillDemoCredentials = (type: "user" | "admin") => {
    if (type === "user") {
      form.setValue("email", "user@example.com");
      form.setValue("password", "111111");
    } else {
      form.setValue("email", "admin@example.com");
      form.setValue("password", "111111");
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await login(data);
    if (res.data?.token) {
      dispatch(
        loginToken({
          token: res.data?.token,
          role: res.data?.role,
          userId: res.data?.userId,
        })
      );
      if (res.data?.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
      toast({
        title: "Account Login Successfully!",
        description: "You can now log in and start exploring.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(res?.error, null, 2)}
            </code>
          </pre>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        <div className="py-4">
          Fill with demo{" "}
          <span
            onClick={() => fillDemoCredentials("user")}
            className="px-2 bg-yellow-300 dark:bg-yellow-500 hover:bg-yellow-400 dark:hover:bg-yellow-600 rounded-md py-0.5 cursor-pointer"
          >
            User
          </span>{" "}
          or{" "}
          <span
            onClick={() => fillDemoCredentials("admin")}
            className="px-2 bg-yellow-300 dark:bg-yellow-500 hover:bg-yellow-400 dark:hover:bg-yellow-600 rounded-md py-0.5 cursor-pointer"
          >
            Admin
          </span>{" "}
          credentials
        </div>
        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
