"use client";

import React, { ChangeEvent, useState } from "react";
import { uploadFile } from "@/lib/uploadFile";

export default function Page() {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      console.log(files);
      setUploading(true);
      try {
        const fileList = Array.from(files);
        const uploadPromises = fileList.map((file) =>
          uploadFile(file, "tests")
        );
        const urls = await Promise.all(uploadPromises);
        setUploadedUrls((prevUrls) => [...prevUrls, ...urls]);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Error uploading files");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">File Upload Test</h1>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          disabled:opacity-50"
      />
      {uploading && <p className="mt-2">Uploading...</p>}
      {uploadedUrls.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg mb-2">Uploaded Files:</h2>
          <ul className="list-disc pl-4">
            {uploadedUrls.map((url, index) => (
              <li key={index}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
