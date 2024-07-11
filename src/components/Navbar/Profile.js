"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";

import { ArrowLeftEndOnRectangleIcon, UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

import ThemedText from "@/components/ThemedText";
import Image from "next/image";

import { SignOut } from "../auth/sign-out";

export default function Profile({ session }) {
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpened(false);
      }
    });
    return () => {
      document.removeEventListener("mousedown", (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownOpened(false);
        }
      });
    };
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        title="Open profile menu"
        onClick={() => {
          setDropdownOpened(!dropdownOpened);
        }}
        className="flex gap-2 items-center"
      >
        <Image
          src={session?.user?.image}
          alt={`${session?.user?.name}'s profile picture`}
          width={30}
          height={30}
          className="rounded-full"
        />
        <ThemedText type="paragraph" className="font-bold">
          {session?.user?.name}
        </ThemedText>
      </button>
      <AnimatePresence>
        {dropdownOpened && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{
              duration: 0.2,
            }}
            className="absolute bottom-10 bg-white p-5 rounded shadow flex flex-col gap-2"
          >
            <Link title='View profile' href={`/profile/${session?.user?.id}`} className="flex gap-2 items-center hover:text-red-accent hover:stroke-red-accent transition-all">
              <UserCircleIcon className="size-6"/>
              <ThemedText>View Profile</ThemedText>
            </Link>
            <Link title='Settings' href='/settings' className="flex gap-2 items-center hover:text-red-accent hover:stroke-red-accent transition-all">
              <Cog6ToothIcon className="size-6"/>
              <ThemedText>Settings</ThemedText>
            </Link>
            <SignOut className="flex gap-2 items-center hover:text-red-accent hover:stroke-red-accent transition-all">
              <ArrowLeftEndOnRectangleIcon className="size-6" />
              <ThemedText>Sign Out</ThemedText>
            </SignOut>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
