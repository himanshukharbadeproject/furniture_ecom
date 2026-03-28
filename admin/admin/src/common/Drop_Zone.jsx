"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUploader() {

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Files dropped:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, 
    multiple: true // allow multiple files
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 h-[250px] p-[100px] text-center cursor-pointer"
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p className="font-semibold text-blue-600">Drop the files here...</p>
      ) : (
        <p className="text-gray-600">
          Drag & drop files here, or <span className="text-blue-600">click to upload</span>
        </p>
      )}
    </div>
  );
}
