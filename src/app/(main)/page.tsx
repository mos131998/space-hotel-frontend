import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <Input />
      <Button size={"xl"} variant={"outline"} className="bg-[#F4259D]">
        Click Me
      </Button>
    </>
  );
}
