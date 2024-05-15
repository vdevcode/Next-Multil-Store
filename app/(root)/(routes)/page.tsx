"use client";

// import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { Modal } from "@/components/modal";

const SetupPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Create Your Store"
        description=""
        isOpen={isModalOpen}
        onClose={handleClose}
      > 

      hello
      </Modal>
    </div>
  );
};

export default SetupPage;
