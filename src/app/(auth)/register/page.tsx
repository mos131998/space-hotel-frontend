import RegisterForm from "@/components/features/auth/register-form";
import { Button } from "@/components/ui/button";
import { Earth } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="grid gap-5 max-w-xl mx-auto p-4 border border-pink-500 rounded-sm py-4">
        {/* Back button */}
        <div className="mx-4">
          <Button variant="ghost" className="rounded-full size-8" asChild>
            <Link href="/login">
              <Earth className="text-pink-500" />
            </Link>
          </Button>
        </div>

        {/* alien logo */}
        <Image
          alt="alien"
          src="/alien.png"
          width={60}
          height={60}
          className="mx-auto"
        />

        {/*title */}
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Start Your Cosmic Journey
          </h1>
          <p className="text-sm text-[#FF3EA5]">
            มาเป็นส่วนหนึ่งของโรงเเรมอวกาศสาขามงคลกิตกันเถอะ
          </p>
        </div>
        {/*register Form */}

        <RegisterForm />
      </div>
    </div>
  );
}
