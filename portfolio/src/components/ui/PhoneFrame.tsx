import type { ReactNode } from "react";

/**
 * A modern phone outline drawn in CSS. Children fill the screen; media should use object-cover
 * so portrait recordings (and pillarboxed 16:9 ones) crop cleanly to the screen shape.
 * Size it by height; the width follows from the aspect ratio.
 */
export default function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative aspect-[9/19.5] ${className ?? ""}`}>
      {/* Side buttons */}
      <span aria-hidden className="absolute -left-[2px] top-[18%] h-[5%] w-[3px] rounded-l-sm bg-neutral-500" />
      <span aria-hidden className="absolute -left-[2px] top-[26%] h-[9%] w-[3px] rounded-l-sm bg-neutral-500" />
      <span aria-hidden className="absolute -left-[2px] top-[37%] h-[9%] w-[3px] rounded-l-sm bg-neutral-500" />
      <span aria-hidden className="absolute -right-[2px] top-[28%] h-[13%] w-[3px] rounded-r-sm bg-neutral-500" />

      {/* Titanium rim + black bezel */}
      <div className="relative h-full w-full rounded-[14%/6.5%] bg-gradient-to-br from-neutral-400 via-neutral-600 to-neutral-400 p-[1.5%] shadow-2xl">
        <div className="h-full w-full rounded-[13%/6%] bg-black p-[3.5%]">
          <div className="relative h-full w-full overflow-hidden rounded-[10.5%/4.9%] bg-neutral-900 [transform:translateZ(0)]">
            {children}
            {/* Dynamic Island */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[1.6%] z-10 h-[3.6%] w-[32%] -translate-x-1/2 rounded-full bg-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
