"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useAddOrderFeedbackMutation,
  useGetOrderFeedbackByOrderQuery,
} from "@/redux/api/orderFeedback";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/slice/user";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must not exceed 500 characters"),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const OrderFeedback = ({ orderId }: { orderId: string }) => {
  const [rating, setRating] = useState(0);
  const [addOrderFeedback, { isLoading }] = useAddOrderFeedbackMutation();
  const token = useAppSelector(selectToken);
  const { data: orderFeedback } = useGetOrderFeedbackByOrderQuery({
    token: token as string,
    orderId,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      description: "",
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    await addOrderFeedback({
      token: token as string,
      orderId,
      feedback: data,
    });
    form.reset();
    setIsDialogOpen(false);
  };

  if (orderFeedback) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`${
                  star <= orderFeedback.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <p>{orderFeedback.description}</p>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Rate Your Order</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate Your Order</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`cursor-pointer ${
                            star <= rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          onClick={() => {
                            setRating(star);
                            field.onChange(star);
                          }}
                        />
                      ))}
                    </div>
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
                  <FormLabel>Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your feedback here..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderFeedback;
