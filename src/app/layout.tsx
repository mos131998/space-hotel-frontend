import "@/styles/globals.css";

import { Metadata } from "next";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";

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
    <html lang="en" className={cn("font-sans")}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
