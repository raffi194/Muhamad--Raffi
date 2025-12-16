import * as React from "react";

export const WorkTable = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <div className="group inline-block"> {/* Wrapper untuk trigger hover group */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="659"
      height="634"
      fill="none"
      viewBox="0 0 659 634"
      // Efek Melompat & Shadow:
      // transition-all: mengaktifkan animasi halus.
      // group-hover:-translate-y-3: menggerakkan ikon ke atas saat hover.
      // group-hover:drop-shadow-2xl: menambah bayangan agar efek melayang lebih realistis.
      className={`
        transition-all duration-300 ease-out 
        group-hover:-translate-y-3 group-hover:scale-[1.02] 
        group-hover:drop-shadow-2xl
        ${className}
      `}
      {...props}
    >
      <mask
        id="mask0_1036_8103"
        width="659"
        height="634"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "luminance" }}
      >
        <path fill="#fff" d="M658.667 0H0v633.333h658.667z" />
      </mask>
      <g mask="url(#mask0_1036_8103)">
        <mask
          id="mask1_1036_8103"
          width="659"
          height="631"
          x="0"
          y="1"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "luminance" }}
        >
          <path fill="#fff" d="M.161 1.334h658.24V632H.161z" />
        </mask>
        <g mask="url(#mask1_1036_8103)">
          <mask
            id="mask2_1036_8103"
            width="659"
            height="632"
            x="0"
            y="1"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "luminance" }}
          >
            <path
              fill="url(#pattern0_1036_8103)"
              d="M.196 1.254h658.197v630.849H.196z"
            />
          </mask>
          <g mask="url(#mask2_1036_8103)">
            <path
              fill="url(#pattern1_1036_8103)"
              d="M.196 1.254h658.197v630.849H.196z"
            />
            
            {/* --- LAYER CAHAYA (GLOW EFFECT) --- */}
            {/* Rect ini menutupi seluruh area gambar tapi menggunakan mask yang sama */}
            <rect
              width="659"
              height="634"
              className="fill-white opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-30 mix-blend-overlay"
            />
          </g>
        </g>
      </g>
      <defs>
        <pattern
          id="pattern0_1036_8103"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use xlinkHref="#image0_1036_8103" transform="scale(.0007 .00073)" />
        </pattern>
        <pattern
          id="pattern1_1036_8103"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use xlinkHref="#image1_1036_8103" transform="scale(.0007 .00073)" />
        </pattern>
        <image
          id="image0_1036_8103"
          width="1420"
          height="1361"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
        <image
          id="image1_1036_8103"
          width="1420"
          height="1361"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  </div>
);

export default WorkTable;