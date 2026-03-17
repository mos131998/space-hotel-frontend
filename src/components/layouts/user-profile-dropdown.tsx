import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function UserProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center">
        <Avatar className="size-10">
          <AvatarImage alt="user" src="alien.png" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2">
        <DropdownMenuItem asChild className="hover:bg-pink-300 cursor-pointer">
          <Link href="/profile">
            <Avatar className="size-9">
              <AvatarImage alt="alien" src="/alien.png" />
            </Avatar>
            <div>
              <h2 className="text-sm font-semibold">minion</h2>
              <p className="text-xs text-muted-foreground">See Your Profile</p>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2 " />
        <DropdownMenuItem asChild className="hover:bg-pink-300 cursor-pointer">
          <button className="flex gap-2 items-center w-full">
            <div className="bg-muted size-6 flex justify-center items-center rounded-full">
              <LogOut />
            </div>
            <span className="font-semibold">Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
