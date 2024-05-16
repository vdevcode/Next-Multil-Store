"use client";
import { StoreModal } from "@/components/modal/store-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMouted, setIsMouted] = useState(false);

  useEffect(() => {
    setIsMouted(true);
  }, []);

  if (!isMouted) {
    return null;
  }

  return (
    <StoreModal />
  );
};
