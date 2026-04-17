import Headers from "@/components/layouts/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  return (
    <div>
      <Headers />
    </div>
  );
}
