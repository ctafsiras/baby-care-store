"use client";

import { useAppSelector } from "@/redux/hooks";
import { selectRole, selectToken } from "@/redux/slice/user";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const role = useAppSelector(selectRole);
  console.log("role", role);

  const navItems = [
    ...(role === "admin"
      ? [
          { href: "/dashboard/products", label: "Products" },
          { href: "/dashboard/orders", label: "Orders" },
        ]
      : [{ href: "/dashboard/my-orders", label: "My Orders" }]),
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          <ul>
            {navItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`block px-4 py-2 text-sm ${
                    pathname === item.href
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
