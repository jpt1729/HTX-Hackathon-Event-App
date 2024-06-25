"use client";
import { useModal } from "@/utils/context/ModalContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Modal({ ...props }) {
  const { isVisible, hideModal, modalContent } = useModal();
  if (!isVisible) return null;
  return (
    <div className="fixed left-0 top-0 w-screen h-screen bg-black/50 flex justify-center items-center">
      <div className=" bg-white max-w-screen-sm rounded p-5">
        <div className="flex justify-end">
          <button name='Close modal' onClick={hideModal} className=""><XMarkIcon className="size-6 hover:stroke-red-accent transition-colors"/></button>
        </div>
        {modalContent}
      </div>
    </div>
  );
}
