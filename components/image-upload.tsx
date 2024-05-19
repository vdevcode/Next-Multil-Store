"use client";

import { ImagePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMouted, setIsMouted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<Number>(0);

  useEffect(() => {
    setIsMouted(true);
  }, []);

  if (!isMouted) {
    return null;
  }

  const onUpload = (e: any) => {
      const file = e.target.files[0]
      console.log(file)
  };

  return (
    <div>
      {value && value.length > 0 ? (
        <></>
      ) : (
        <div className="w-52 h-52 rounded-md overflow-hidden border border-dashed border-gray-200 flex items-center justify-center flex-col gap-3">
          {isLoading ? (
            <>
              <PuffLoader size={30} color="#555" />
              <p>{`${progress.toFixed(2)}%`}</p>
            </>
          ) : (
            <>
              <label className=" cursor-pointer w-full h-full">
                <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                  <ImagePlus className="h-8 w-8" />
                  <p>Upload Image</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="w-0 h-0"
                  onChange={onUpload}
                />
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
