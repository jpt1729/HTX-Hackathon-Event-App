"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  PencilSquareIcon,
  ChatBubbleLeftEllipsisIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import ThemedText from "@/components/ThemedText";

import { deleteContent } from "./action";
import { usePathname, useRouter } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";

const dropdownVariants = {
  opened: {},
};

export default function EditBar({ id }) {
  const pathname = usePathname();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div animate={dropdownOpen ? "opened" : "closed"} className="relative">
      <button
        ref={buttonRef}
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
        }}
        title="Open menu"
      >
        <EllipsisVerticalIcon className="size-6" />
      </button>
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{
              duration: 0.2,
            }}
            className={`block absolute top-6 left-0 bg-white rounded p-5 shadow z-50 w-max`}
          >
            <Link
              title="View Responses"
              href={`${pathname}/admin?id=${id}`}
              className="flex gap-2 hover:text-red-accent hover:stroke-red-accent transition-colors"
            >
              <ChatBubbleLeftEllipsisIcon className="size-6" />
              <ThemedText>View responses</ThemedText>
            </Link>
            <Link
              title="Edit Content"
              href={`${pathname}/admin/edit-content?id=${id}`}
              className="flex gap-2 hover:text-red-accent hover:stroke-red-accent transition-colors"
            >
              <PencilSquareIcon className="size-6" />
              <ThemedText>Edit content</ThemedText>
            </Link>
            <button
              onClick={async (e) => {
                await deleteContent(id);
                router.refresh();
              }}
              className="flex gap-2 hover:text-warning hover:stroke-warning transition-colors"
            >
              <TrashIcon className="size-6" />
              <ThemedText>Delete</ThemedText>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
