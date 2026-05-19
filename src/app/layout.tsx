import "@/styles/globals.css";

import { Metadata } from "next";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s - SpaceHotel",
    default: "SpaceHotel",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
