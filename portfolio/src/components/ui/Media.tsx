"use client";
// Image and video wrappers that show a skeleton until the media has actually loaded.
import Image, { type ImageProps } from "next/image";
import { forwardRef, useCallback, useState, type VideoHTMLAttributes } from "react";

export function SkeletonImage({ className, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <span className="skeleton absolute inset-0" aria-hidden />}
      <Image
        {...props}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={`${className ?? ""} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

export const SkeletonVideo = forwardRef<HTMLVideoElement, VideoHTMLAttributes<HTMLVideoElement>>(
  function SkeletonVideo({ className, onLoadedData, onLoadedMetadata, ...props }, ref) {
    const [loaded, setLoaded] = useState(false);
    const setRefs = useCallback(
      (el: HTMLVideoElement | null) => {
        // The first frame may already be decoded before hydration attaches onLoadedData.
        if (el && el.readyState >= 2) setLoaded(true);
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      },
      [ref]
    );
    return (
      <>
        {!loaded && <span className="skeleton absolute inset-0" aria-hidden />}
        <video
          ref={setRefs}
          {...props}
          onLoadedData={(e) => {
            setLoaded(true);
            onLoadedData?.(e);
          }}
          // iOS Safari may stop at metadata with preload="metadata"; don't leave the skeleton up forever.
          onLoadedMetadata={(e) => {
            setTimeout(() => setLoaded(true), 1200);
            onLoadedMetadata?.(e);
          }}
          className={`${className ?? ""} transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </>
    );
  }
);
