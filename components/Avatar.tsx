import { createAvatar } from "@dicebear/core";
import { rings } from "@dicebear/collection";
import Image from "next/image";
import React from "react";

function Avatar({ seed, className }: { seed: string; className?: string }) {
  const avatar = createAvatar(rings, { seed });

  //   const svg = avatar.toString();
  const dataUrl = avatar.toDataUri();
  //   const dataUrl = `data:image/svg+xml,${Buffer.from(svg).toString("base64")}`;

  return (
    <Image
      src={dataUrl}
      alt="Avatar"
      width={50}
      height={50}
      className={className}
    />
  );
}

export default Avatar;
