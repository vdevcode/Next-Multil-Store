import React, { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mouted, setMouted] = useState(false);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setMouted(true);
  }, []);

  if(!mouted){
    return ""
  }
  return origin
};

