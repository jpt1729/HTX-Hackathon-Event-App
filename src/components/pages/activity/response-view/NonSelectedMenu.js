import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
  ChevronLeftIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const MenuIconVariants = {
  opened: {
    rotate: 180,
  },
  closed: {
    rotate: 0,
  },
};

export default function NonSelectedMenu({}) {
  const [filterOpened, setFilterOpened] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      <motion.button
        animate={filterOpened ? "opened" : "closed"}
        onClick={() => {
          setFilterOpened(!filterOpened);
        }}
        name="Filter responses"
        className="flex items-center gap-2 border px-2 border-gray rounded border-dashed"
      >
        Filter{" "}
        <motion.span variants={MenuIconVariants} transition={{ duration: 0.2 }}>
          <ChevronUpIcon className="size-4" />
        </motion.span>
      </motion.button>
      {filterOpened && (
        <motion.div className="absolute flex flex-col bg-white p-3 rounded-lg shadow items-start">
          <button
            onClick={(e) => {
              const params = new URLSearchParams(searchParams);
              params.set("sort", "ascending");
              router.replace(`${pathname}?${params.toString()}`);
            }}
          >
            Ascending{" "}
          </button>
          <button
            onClick={(e) => {
              const params = new URLSearchParams(searchParams);
              params.set("sort", "descending");
              router.replace(`${pathname}?${params.toString()}`);
            }}
          >
            Descending{" "}
          </button>
        </motion.div>
      )}
    </>
  );
}
