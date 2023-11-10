import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner() {
  return (
    <div className="w-full h-screen items-center flex justify-center">
      <ClipLoader className="bg-sky-500 " size={150} aria-label="loading" />
    </div>
  );
}
