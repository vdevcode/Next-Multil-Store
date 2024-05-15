"use client";

// import { UserButton } from "@clerk/nextjs";
import React from "react";
import { Modal } from "@/components/modal";

const SetupPage = () => {
  return (
    <div>
      store modal
      <Modal
        title="Create Your Store"
        description=""
        isOpen
        onClose={() => {}}
      > 

      hello
      </Modal>
    </div>
  );
};

export default SetupPage;
