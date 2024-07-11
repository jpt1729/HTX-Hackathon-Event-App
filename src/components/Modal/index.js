"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/utils/context/ModalContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useReducedMotion } from "framer-motion"

export default function Modal({ ...props }) {
  const { isVisible, hideModal, modalContent } = useModal();
  const prefersReducedMotion = useReducedMotion()
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            opacity: !prefersReducedMotion && 0,
          }}
          animate={{
            opacity: !prefersReducedMotion && 1,
          }}
          exit={{
            opacity: !prefersReducedMotion && 0,
          }}
          transition={{ duration: 0.2 }}
          className="fixed left-0 top-0 w-screen h-screen bg-black/20 flex justify-center items-center"
        >
          <motion.div
            initial={{
              opacity: !prefersReducedMotion && 0.3,
              y: !prefersReducedMotion && 5,
            }}
            animate={{
              opacity: !prefersReducedMotion && 1,
              y: !prefersReducedMotion && 0,
            }}
            exit={{
              opacity: !prefersReducedMotion && 0.3,
              y: !prefersReducedMotion && 5,
            }}
            transition={{ duration: 0.2 }}
            className=" bg-white max-w-screen-sm rounded p-5"
          >
            <div className="flex justify-end">
              <button name="Close modal" onClick={hideModal} className="">
                <XMarkIcon className="size-6 hover:stroke-red-accent transition-colors" />
              </button>
            </div>
            {modalContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
