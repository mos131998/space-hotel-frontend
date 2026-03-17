import Image from "next/image";
import Link from "next/link";
import MainNavigation from "./main-navigation";
import UserProfileDropdown from "./user-profile-dropdown";

export default function Headers() {
  return (
    <header className=" flex h-12 fixed top-0 left-0 right-0 z-50 px-4 justify-between items-center">
      {/*hotel logo */}
      <div className="flex justify-center items-center">
        <Link href="/" className="size-10 flex justify-center items-center">
          <Image alt="hotel" src="/alien.png" width={20} height={20} />
        </Link>
        <h2 className="text-white">hotel space yager</h2>
      </div>

      {/*main navigation */}
      <MainNavigation />

      <div className="justify-self-end text-white">
        <UserProfileDropdown />
      </div>
    </header>
  );
}
