"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slice/user";

let openModal: (() => void) | null = null;

export function openLogoutConfirmation() {
  if (openModal) {
    openModal();
  }
}

export default function LogoutConfirmation() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  openModal = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="z-50">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
