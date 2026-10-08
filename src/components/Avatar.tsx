"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface AvatarProps {
  src: string;
  alt: string;
  initials: string;
  size: number;
  wrapperClassName: string;
  imageClassName: string;
  fallbackClassName: string;
}

/** Learner photo that degrades to initials if the image fails to load. */
export function Avatar({ src, alt, initials, size, wrapperClassName, imageClassName, fallbackClassName }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // onError can fire before hydration attaches the handler; catch images that already failed.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <span className={wrapperClassName}>
      {failed ? (
        <b className={fallbackClassName} aria-hidden="true">
          {initials}
        </b>
      ) : (
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          width={size}
          height={size}
          className={imageClassName}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
