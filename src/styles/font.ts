import { Roboto_Slab } from "next/font/google";
import { IBM_Plex_Sans_Thai } from "next/font/google";
export const RobotoSlab = Roboto_Slab();

export const IMBPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
