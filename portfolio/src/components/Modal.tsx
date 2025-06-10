"use client";
import { motion } from "framer-motion";
import { FaEnvelope, FaCheck, FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "success" | "error" | null;
}

const Modal = ({ isOpen, onClose, status }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="fixed left-[30%] top-[30%] -translate-x-1/2 -translate-y-1/2 z-[101] w-[40%]  bg-card rounded-xl shadow-2xl p-8"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block"
          >
            {status === "success" ? (
              <div className="relative">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [-20, 0] }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <FaEnvelope className="text-6xl text-primary mx-auto" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute -right-1 -top-1 bg-green-500 rounded-full p-1"
                >
                  <FaCheck className="text-white text-sm" />
                </motion.div>
              </div>
            ) : (
              <div className="relative">
                <FaEnvelope className="text-6xl text-red-500 mx-auto" />
                <div className="absolute -right-1 -top-1 bg-red-500 rounded-full p-1">
                  <FaTimes className="text-white text-sm" />
                </div>
              </div>
            )}
          </motion.div>
          <h3 className="text-xl font-semibold text-foreground">
            {status === "success" ? "Message Sent!" : "Failed to Send"}
          </h3>
          <p className="text-muted-foreground">
            {status === "success"
              ? "Thank you for reaching out. I'll get back to you soon!"
              : "Something went wrong. Please try again later."}
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-foreground text-background rounded-lg hover:bg-primary/90 transition-colors"
          >
            OK
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
