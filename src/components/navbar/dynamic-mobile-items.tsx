"use client";

import { JSX, SVGProps } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout, selectUser } from "@/redux/slice/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectTotalItems } from "@/redux/slice/cart";

export default function DynamicMobileItems() {
  const dispatch = useAppDispatch();
  const userToken = useAppSelector(selectUser);
  const itemCount = useAppSelector(selectTotalItems);
  return (
    <>
      <Link
        href="/checkout"
        className="inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 "
      >
        <div className="relative">
          <ShoppingCartIcon className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-yellow-600 rounded-full">
              {itemCount}
            </span>
          )}
        </div>
        <span className="sr-only">Cart</span>
      </Link>
      {userToken ? (
        <>
          <Link
            href="/dashboard"
            className="inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Dashboard
          </Link>
          <div className="text-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border w-8 h-8"
              onClick={() => dispatch(logout())}
            >
              <LogOutIcon className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </>
      ) : (
        <div className="grid gap-2">
          <Link
            href="/login"
            className="inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Register
          </Link>
        </div>
      )}
    </>
  );
}

function LogOutIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function ShoppingCartIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
