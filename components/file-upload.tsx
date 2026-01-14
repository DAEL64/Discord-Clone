"use client";

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";           

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split('.').pop()

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          alt="upload"
          className="rounded-full"
        />
        <button
        onClick={() => onChange("")}
        className="bg-rose-500 text-white cursor-pointer p-1 rounded-full absolute top-0 right-0 shadow-sm"
        type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }


  return (
    <UploadDropzone
      className="h-45 w-60 gap-1.5 py-1.5 ease-in-out cursor-pointer border-dashed rounded-md"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
