    "use client"

    import React, { useState } from 'react';
    import { NextRequest } from 'next/server';

    export default function Page() {
      const [file, setFile] = useState<File | null>(null);
      const [message, setMessage] = useState<string>('');

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };

      const handleUpload = async () => {
        if (!file) {
          setMessage('No file selected');
          return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const result = await response.json();
            setMessage(`File uploaded successfully. URL: ${result.url}`);
          } else {
            const result = await response.json();
            setMessage(`Upload failed: ${result.message}`);
          }
        } catch (error) {
          setMessage(`Upload error: ${(error as Error).message}`);
        }
      };

      return (
        <div>
          <h1>File Uploader</h1>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          {message && <p>{message}</p>}
        </div>
      );
    }