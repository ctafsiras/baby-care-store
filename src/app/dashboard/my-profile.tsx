import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { UpdateProfileModal } from "@/components/profile/update-profile-modal";
import { useUpdateProfileMutation } from "@/redux/api/profile";
import { toast } from "@/hooks/use-toast";

const MyProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const [updateProfile] = useUpdateProfileMutation();

  const handleUpdateProfile = async (updatedData: Partial<typeof user>) => {
    try {
      await updateProfile(updatedData).unwrap();
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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Name:</p>
            <p>{user.name}</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="font-semibold">Phone:</p>
            <p>{user.phone}</p>
          </div>
          <div>
            <p className="font-semibold">Address:</p>
            <p>{user.address}</p>
          </div>
        </div>
        <Button className="mt-6" onClick={() => setIsModalOpen(true)}>
          Update Profile
        </Button>
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
