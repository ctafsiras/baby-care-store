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
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/product";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/slice/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Product } from "@prisma/client";

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
  id: z.string().min(1, {
    message: "ID must be at least 1 character.",
  }),
  image: z.string().min(1, {
    message: "Image must be at least 1 character.",
  }),
});

export default function EditProductModal({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const token = useAppSelector(selectToken);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      stock: product.stock.toString(),
      price: product.price.toString(),
      id: product.id,
      image: product.image,
    },
  });

  if (!token) {
    toast({
      variant: "destructive",
      title: "Unauthorized",
      description: "Please login as Admin to edit products",
    });
    return null;
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const productData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    };

    const res = await updateProduct({
      product: productData,
      token: token as string,
    });

    console.log(res);

    if (res.data?.id) {
      toast({
        title: "Product Updated Successfully!",
        description: "The product has been saved.",
      });
      setIsOpen(false);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Input placeholder="Stock" {...field} />
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
                    <Input placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="w-full" type="submit">
              Update Product
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
