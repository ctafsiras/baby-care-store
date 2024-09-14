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
import { useRouter } from "next/navigation";
import { useAddProductMutation } from "@/redux/api/product";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/slice/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product | Baby Care Store Admin",
  description:
    "Add new baby care products to our online store easily and efficiently",
};
const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  price: z.string().min(1, {
    message: "Price must be at least 1 character.",
  }),
  stock: z.string().min(1, {
    message: "Stock must be at least 1 character.",
  }),
});

export default function AddProduct() {
  const [AddProduct, { isLoading }] = useAddProductMutation();
  const token = useAppSelector(selectToken);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      stock: "",
      price: "",
    },
  });
  if (!token) {
    toast({
      variant: "destructive",
      title: "Unauthorized",
      description: "Please login as Admin to add products",
    });
    return router.push("/");
  }
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await AddProduct({
      product: {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      },
      token: token as string,
    });

    console.log(res);
    if (res.data?.id) {
      toast({
        title: "Product Added Successfully!",
        description: "You can now log in and start exploring.",
      });
      form.reset();
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input placeholder="Stock" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading ? "Adding..." : "Add Product"}
        </Button>
      </form>
    </Form>
  );
}
