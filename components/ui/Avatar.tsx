/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";

interface AvatarProps {
  w?: number;
  src?: string;
  name?: string;
}

export default function Avatar({ src, w = 10, name }: AvatarProps) {
  const [avatar, setAvatar] = useState<string | undefined>(src);

  return (
    <div className="avatar">
      <div className={`w-${w} rounded-full`}>
        <img
          loading="lazy"
          src={avatar}
          alt="Profile"
          onError={() => setAvatar(`https://ui-avatars.com/api/?name=${name}`)}
        />{" "}
      </div>
    </div>
  );
}
