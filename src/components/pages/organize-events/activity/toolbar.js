import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

import ThemedText from "@/components/ThemedText";

const MenuIconVariants = {
  opened: {
    rotate: 180,
  },
  closed: {
    rotate: 0,
  },
};
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Toolbar({ onNavigate, view, views, label, onView }) {
  const [viewMenuOpened, setViewMenuOpened] = useState(false);
  return (
    <div className="flex p-3 gap-3 justify-between w-full">
      <div className="relative">
        <motion.button
          className="flex items-center gap-1 px-2 border border-gray hover:border-red-accent focus:border-red-accent rounded transition-colors hover:text-red-accent"
          onClick={() => {
            setViewMenuOpened(!viewMenuOpened);
          }}
          animate={viewMenuOpened ? "opened" : "closed"}
        >
          <ThemedText>{capitalizeFirstLetter(view)} </ThemedText>
          <motion.div
            variants={MenuIconVariants}
            transition={{ duration: 0.2 }}
          >
            <ChevronUpIcon className="size-4" />
          </motion.div>
        </motion.button>
        {viewMenuOpened && (
          <div className="flex flex-col gap-3 absolute bg-white z-50 shadow p-5 justify-start top-10">
            <button
              onClick={() => {
                onView(views[2]);
              }}
              className="text-left transition-colors hover:text-red-accent flex items-center gap-1"
            >
              {view === "day" ? (
                <CheckIcon className="size-4" />
              ) : (
                <span className="w-4 h-4"></span>
              )}
              Day
            </button>
            <button
              onClick={() => {
                onView(views[1]);
              }}
              className="text-left transition-colors hover:text-red-accent flex items-center gap-1"
            >
              {view === "week" ? (
                <CheckIcon className="size-4" />
              ) : (
                <span className="w-4 h-4"></span>
              )}
              Week
            </button>
            <button
              onClick={() => {
                onView(views[0]);
              }}
              className="text-left transition-colors hover:text-red-accent flex items-center gap-1"
            >
              {view === "month" ? (
                <CheckIcon className="size-4" />
              ) : (
                <span className="w-4 h-4"></span>
              )}
              Month
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <div>
          <ThemedText>{label}</ThemedText>
        </div>
        <div className="flex">
          <button
            onClick={() => {
              onNavigate("TODAY");
            }}
            className="px-2 border border-gray hover:border-red-accent transition-colors rounded hover:text-red-accent"
          >
            <ThemedText className="!leading-0">Today</ThemedText>
          </button>
          <button
            onClick={() => {
              onNavigate("PREV");
            }}
            className=""
          >
            <ChevronLeftIcon className="size-4 hover:stroke-red-accent transition-colors" />
          </button>
          <button
            onClick={() => {
              onNavigate("NEXT");
            }}
            className=""
          >
            <ChevronRightIcon className="size-4 hover:stroke-red-accent transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
