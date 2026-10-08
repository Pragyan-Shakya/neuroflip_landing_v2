"use client";

import Image from "next/image";
import { useState } from "react";

interface AvatarProps {
  src: string;
  alt: string;
  initials: string;
  size: number;
  priority?: boolean;
  wrapperClassName: string;
  imageClassName: string;
  fallbackClassName: string;
}

/** Learner photo that degrades to initials if the image fails to load. */
export function Avatar({
  src,
  alt,
  initials,
  size,
  priority,
  wrapperClassName,
  imageClassName,
  fallbackClassName,
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={wrapperClassName}>
      {failed ? (
        <b className={fallbackClassName} aria-hidden="true">
          {initials}
        </b>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          priority={priority}
          className={imageClassName}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
