import React from 'react';

export default function Logo({ width = 18, height = 16, className = "" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1155 1000"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M577.344 0L1154.69 1000H0L577.344 0Z"
        fill="white"
      />
    </svg>
  );
}