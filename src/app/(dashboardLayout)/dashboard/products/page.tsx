"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/api/product";
import Loading from "@/app/loading";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/slice/user";
import { toast } from "@/hooks/use-toast";
import EditProductModal from "@/components/product/edit-product-modal";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ProductsPage() {
  const token = useAppSelector(selectToken);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }
  const handleDelete = async (id: string) => {
    const res = await deleteProduct({ productId: id, token: token as string });
    console.log("res", res);
    if (res.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: <pre>{JSON.stringify(res.error, null, 2)}</pre>,
      });
    } else {
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product No</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Added At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={product.image}
                  width={50}
                  height={50}
                  alt={product.name}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    {product.description.substring(0, 30)}...
                  </PopoverTrigger>
                  <PopoverContent>{product.description}</PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                {new Date(product.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <span className="mr-2">
                  <EditProductModal product={product} />
                </span>
                <Button
                  variant="destructive"
                  disabled={isDeleting}
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
