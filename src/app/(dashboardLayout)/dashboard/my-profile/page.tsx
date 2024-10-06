"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
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
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
      <div className=" shadow-md rounded-lg px-6 py-4">
        <div className="flex justify-center items-center mb-4">
          <Image
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Profile Image"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <p className="font-semibold">Name:</p>
            <p>{user.name}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold">Email:</p>
            <p>{user.email}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold">Phone:</p>
            <p>{user.phone}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold">Address:</p>
            <p>{user.address}</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button className="mt-6" onClick={() => setIsModalOpen(true)}>
            Update Profile
          </Button>
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
    </div>
  );
};

export default MyProfile;
