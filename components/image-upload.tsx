"use client";

import React, { useEffect, useState } from "react";
import {PuffLoader} from "react-spinners"

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

  return (
    <div>
      {value && value.length > 0 ? (
        <></>
      ) : (
        <div className="w-52 h-52 rounded-md overflow-hidden border border-dashed border-gray-200 flex items-center justify-center flex-col gap-3">
            {
                isLoading ? (<>
                    <PuffLoader size={30} color="#555" />
                </>) : ""
            }   
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
