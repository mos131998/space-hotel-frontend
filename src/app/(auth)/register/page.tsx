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
      <div className="grid gap-5 max-w-xl mx-auto p-4 border-1 border-pink-500 rounded-sm py-4">
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
        {/*สู่ความเวิ้งว้างอันไกลโพ้น */}

        <Button
          className="relative
w-full
py-6
rounded-2xl
text-white
font-semibold
bg-gradient
from-[#3A001F]
via-[#5B0026]
to-[#8E1A45]
shadow-[0_20px_60px_rgba(255,0,120,0.5)]
flex
items-center
justify-center
gap-3
"
        >
          <Link href="/login">สู่ความเวิ้งว้างอันไกลโพ้น</Link>
        </Button>
      </div>
    </div>
  );
}
