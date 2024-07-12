"use client";

import { motion } from "framer-motion";
import { joinEventAction } from "./actions";
import ThemedText from "@/components/ThemedText";

export default function JoinEventButton({ eventSlug }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.9 }}
      className="bg-red-accent text-white rounded-lg px-3 py-1 w-fit"
      onClick={async () => {
        await joinEventAction(eventSlug);
      }}
    >
      <ThemedText className="font-bold">Join now!</ThemedText>
    </motion.button>
  );
}
