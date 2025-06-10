"use client";
import { createContext, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Modal from "~/components/Modal";

interface ModalContextType {
  showModal: (status: "success" | "error") => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalStatus, setModalStatus] = useState<"success" | "error" | null>(
    null
  );

  const showModal = (status: "success" | "error") => {
    setModalStatus(status);
  };

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      <AnimatePresence>
        <Modal
          isOpen={modalStatus !== null}
          onClose={() => setModalStatus(null)}
          status={modalStatus}
        />
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
