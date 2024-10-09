"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { UpdateProfileModal } from "@/components/profile/update-profile-modal";
import { User } from "@prisma/client";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profile";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/slice/user";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import ShippingAddress from "@/components/profile/shipping-address";

const MyProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateProfile] = useUpdateProfileMutation();
  const token = useAppSelector(selectToken);
  const { data: user, isLoading } = useGetProfileQuery(token as string);
  const handleUpdateProfile = async (updatedData: Partial<User>) => {
    try {
      await updateProfile({
        data: updatedData,
        token: token as string,
      }).unwrap();
      setIsModalOpen(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an error updating your profile.",
      });
    }
  };
  if (isLoading) {
    return <Loader2 className="mx-auto size-10 h-full my-auto animate-spin" />;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
        My Profile
      </h1>
      <div className="shadow-md rounded-lg px-3 sm:px-6 py-6 sm:py-8 mb-6">
        <div className="flex justify-center items-center mb-6 sm:mb-8">
          <Image
            src={user.image!}
            alt={user.name}
            width={100}
            height={100}
            className="rounded-full sm:w-[150px] sm:h-[150px]"
          />
        </div>
        <table className="w-full border-collapse mb-6 sm:mb-8">
          <tbody>
            <tr className="border-b">
              <td className="py-3 sm:py-4 px-2 sm:px-4 font-semibold">Name</td>
              <td className="py-3 sm:py-4 px-2 sm:px-4">{user.name}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 sm:py-4 px-2 sm:px-4 font-semibold">Email</td>
              <td className="py-3 sm:py-4 px-2 sm:px-4">{user.email}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 sm:py-4 px-2 sm:px-4 font-semibold">Phone</td>
              <td className="py-3 sm:py-4 px-2 sm:px-4">{user.phone}</td>
            </tr>
            <tr>
              <td className="py-3 sm:py-4 px-2 sm:px-4 font-semibold">
                Address
              </td>
              <td className="py-3 sm:py-4 px-2 sm:px-4">{user.address}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center items-center">
          <Button onClick={() => setIsModalOpen(true)}>Update Profile</Button>
        </div>
      </div>
      {isModalOpen && (
        <UpdateProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdateProfile}
          currentUser={user}
        />
      )}
      <ShippingAddress />
    </div>
  );
};

export default MyProfile;
