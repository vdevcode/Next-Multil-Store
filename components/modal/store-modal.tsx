"use client";

import { Modal } from "@/components/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export const StoreModal = () => {
    const storeModal = useStoreModal()
  return (
    <Modal title="Create Your Store" description="heehhhhe" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
      hello
    </Modal>
  );
};
