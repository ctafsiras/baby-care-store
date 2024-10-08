"use client";

import { useAppSelector } from "@/redux/hooks";
import { selectRole } from "@/redux/slice/user";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Box, Plus, ShoppingCart, User, BarChart } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const role = useAppSelector(selectRole);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!role) {
    router.push("/");
  }

  const navItems = [
    ...(role === "admin"
      ? [
          { href: "/dashboard", label: "Overview", icon: <BarChart /> },
          { href: "/dashboard/products", label: "Products", icon: <Box /> },
          {
            href: "/dashboard/add-product",
            label: "Add Product",
            icon: <Plus />,
          },
          {
            href: "/dashboard/orders",
            label: "Orders",
            icon: <ShoppingCart />,
          },
          {
            href: "/dashboard/my-profile",
            label: "My Profile",
            icon: <User />,
          },
        ]
      : [
          {
            href: "/dashboard",
            label: "Overview",
            icon: <BarChart />,
          },
          {
            href: "/dashboard/my-orders",
            label: "My Orders",
            icon: <ShoppingCart />,
          },
          {
            href: "/dashboard/my-profile",
            label: "My Profile",
            icon: <User />,
          },
        ]),
  ];

  return (
    <div className="flex max-h-screen">
      <aside className={`shadow-md ${isMobile ? "w-12" : "w-52"}`}>
        <nav className="mt-5">
          <ul>
            {navItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`block rounded-lg px-4 md:px-4 py-2 text-sm transition-all duration-300 ${
                    pathname === item.href
                      ? "bg-primary text-white dark:bg-white dark:text-black"
                      : "hover:bg-primary/90 hover:text-white dark:hover:bg-white/90 dark:hover:text-black"
                  } ${isMobile ? "flex justify-center" : "flex items-center"}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {!isMobile && <span className="ml-2">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
    </div>
  );
}
