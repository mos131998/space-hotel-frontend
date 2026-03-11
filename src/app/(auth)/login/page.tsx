import LoginForm from "@/components/features/auth/login-form";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="  rounded-2xl px-10">
      <div className="min-h-screen flex justify-center items-center ">
        <div className=" max-w-xl border-1 border-pink-500 rounded-sm py-4  w-full px-8 ">
          <div className="flex justify-center ">
            <Image src="/alien.png" alt="alien" width={80} height={80} />
          </div>
          <h2 className="text-white text-lg font-extrabold">
            Welcome Traveler
          </h2>
          <LoginForm />
          <div className="mt-10">
            <Button
              className="w-full px-10 py-4 rounded-2xl text-white font-semibold tracking-wide
  bg-[#3b0b2a]
  shadow-[0_10px_30px_rgba(255,0,128,0.35)]
  hover:shadow-[0_10px_40px_rgba(255,0,128,0.6)]  
  transition duration-300"
            >
              <Link href="/register"> create space account</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
