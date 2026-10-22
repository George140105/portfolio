"use client";
import { AnimatePresence, motion } from "motion/react";
import { FaCheck, FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "success" | "error" | null;
}

const Modal = ({ isOpen, onClose, status }: ModalProps) => {
  const ok = status === "success";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="alertdialog"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-2xl"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
                ok ? "bg-secondary/15 text-secondary" : "bg-primary/15 text-primary"
              }`}
            >
              {ok ? <FaCheck size={20} /> : <FaTimes size={20} />}
            </motion.span>
            <h3 id="modal-title" className="mt-5 font-serif text-3xl">
              {ok ? "Message sent" : "That didn't go through"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {ok
                ? "Thanks for reaching out. I'll get back to you soon."
                : "Something went wrong. Please try again, or email me directly."}
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-foreground px-6 py-2.5 text-sm text-background transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
