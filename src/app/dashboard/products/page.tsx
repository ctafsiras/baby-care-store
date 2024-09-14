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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Management | Baby Care Store",
  description:
    "Manage and track all products on Baby Care Store, including inventory and orders",
};
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
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
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
