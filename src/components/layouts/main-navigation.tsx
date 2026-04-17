"use client";

import { usePathname } from "next/navigation";
import NavigationItem from "./navigation-item";

const NAVIGATION_ITEM = [
  { href: "/", title: "หน้าหลัก" },
  { href: "/roomhotel", title: "ห้องพัก" },
  { href: "/Booking", title: "จองห้องพัก" },
];

export default function MainNavigation() {
  const pathName = usePathname();

  return (
    <div className="text-white flex gap-3">
      {NAVIGATION_ITEM.map((item) => (
        <NavigationItem
          key={item.href}
          href={item.href}
          isActive={
            pathName === "/"
              ? pathName === item.href
              : pathName.startsWith(item.href)
          }
        >
          {item.title}
        </NavigationItem>
      ))}
    </div>
  );
}
