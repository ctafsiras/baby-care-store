import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAddShippingAddressMutation,
  useGetShippingAddressesQuery,
} from "@/redux/api/profile";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/slice/user";

const addressSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  street: z.string().min(2, "Street must be at least 2 characters"),
  postalCode: z.string().min(4, "Postal code must be at least 4 characters"),
  district: z.string().min(2, "District must be at least 2 characters"),
});

type AddressFormData = z.infer<typeof addressSchema>;

const ShippingAddress: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useAppSelector(selectToken);
  const { data: addresses, isLoading } = useGetShippingAddressesQuery(token!);
  const [addAddress] = useAddShippingAddressMutation();

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = async (data: AddressFormData) => {
    try {
      await addAddress({ token: token!, data });
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Failed to add address:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Shipping Addresses</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add New Address</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} type="submit">
                  {isLoading ? "Adding..." : "Add Address"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <p>Loading addresses...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Street</TableHead>
              <TableHead>Postal Code</TableHead>
              <TableHead>District</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {addresses?.map((address, index) => (
              <TableRow key={address.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{address.name}</TableCell>
                <TableCell>{address.mobile}</TableCell>
                <TableCell>{address.street}</TableCell>
                <TableCell>{address.postalCode}</TableCell>
                <TableCell>{address.district}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ShippingAddress;
