import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Image alt="SpaceHotel" src="/logo.png" width={40} height={40} />
    </div>
  );
}
