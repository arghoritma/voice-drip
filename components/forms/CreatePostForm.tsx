/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from "react";
import { useActionState } from "react";
import { createRequest } from "@/actions/requests";
import { Platform, RequestResponse } from "@/types";

interface requestFormProps {
  onSuccess?: () => void | undefined;
  platforms: Platform[];
}

export default function CreateRequestForm({
  onSuccess,
  platforms,
}: requestFormProps) {
  const initialState: RequestResponse = { errors: {}, success: false };
  const [state, formAction, isPending] = useActionState(
    createRequest,
    initialState
  );
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviewImages: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviewImages.push(e.target.result as string);
          setPreviewImages([...newPreviewImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAllImages = () => {
    setPreviewImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (state.success && onSuccess) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction}>
      {state.errors?._form && (
        <div className="text-error">{state.errors._form.join(", ")}</div>
      )}
      <div className="form-control">
        <label htmlFor="platform" className="label">
          <span className="label-text">Platform</span>
        </label>
        <select
          id="platform"
          name="platform"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select platform</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="type" className="label">
          <span className="label-text">Type</span>
        </label>
        <select
          id="type"
          name="type"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select type</option>
          <option value="feature">Feature</option>
          <option value="bug">Bug</option>
          <option value="improvement">Improvement</option>
        </select>
      </div>
      <div className="space-y-4">
        <div className="form-control">
          <label htmlFor="title" className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="description" className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            id="description"
            name="description"
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Images</span>
          </label>
          <div className="upload__image-wrapper">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              multiple
              accept="image/*"
              name="files"
              className="file-input file-input-bordered w-full mb-2"
            />
            {previewImages.length > 0 && (
              <button
                type="button"
                onClick={removeAllImages}
                className="btn btn-outline btn-sm mb-4"
              >
                Remove all images
              </button>
            )}
            <div className="grid grid-cols-2 gap-4">
              {previewImages.map((image, index) => (
                <div key={index} className="image-item border p-2 rounded">
                  <img src={image} alt="" className="w-full h-auto" />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary w-full"
        >
          {isPending ? (
            <>
              <span className="loading loading-spinner"></span>
              Processing...
            </>
          ) : (
            "Create Request"
          )}
        </button>
      </div>
    </form>
  );
}
