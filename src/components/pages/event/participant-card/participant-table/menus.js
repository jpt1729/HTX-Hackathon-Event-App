import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";
import ThemedInput from "@/components/ThemedText/input";

import {
  XMarkIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import {
  promoteUsersAction,
  demoteUsersAction,
  banUsersAction,
} from "../action";

const MenuIconVariants = {
  opened: {
    rotate: 180,
  },
  closed: {
    rotate: 0,
  },
};

const UserRoleDropdown = ({ query, updateQuery }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const updateRoleQuery = (role) => {
    let newQuery = [...query.userRole]
    const index = newQuery.indexOf(role);

    if (index > -1) {
      // Element is in the list, so remove it
      newQuery.splice(index, 1);
    } else {
      // Element is not in the list, so add it
      newQuery.push(role);
    }
    return newQuery;
  };
  return (
    <motion.div className="absolute top-8 right-0 flex flex-col gap-2 bg-white p-3 rounded-lg shadow items-start w-fit">
      <button
        onClick={(e) => {
          updateQuery({ userRole: updateRoleQuery("owner") });
        }}
        className="border-b border-gray w-full text-left"
      >
        <input
          type="checkbox"
          checked={query.userRole.includes("owner")}
          className="m-auto"
        />
        Owner{" "}
      </button>
      <button
        onClick={(e) => {
          updateQuery({ userRole: updateRoleQuery("organizer") });
        }}
        className="border-b border-gray w-full text-left"
      >
        <input
          type="checkbox"
          checked={query.userRole.includes("organizer")}
          className="m-auto"
        />
        Organizer{" "}
      </button>
      <button
        onClick={(e) => {
          updateQuery({ userRole: updateRoleQuery("participant") });
        }}
        className="border-b border-gray text-left w-max"
      >
        <input
          type="checkbox"
          checked={query.userRole.includes("participant")}
          className="m-auto"
        />
        Participant{" "}
      </button>
    </motion.div>
  );
};
export function NonSelectedMenu({}) {
  const [dropDownStatus, setDropDownStatus] = useState({
    joinedAt: false,
    userRole: false,
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState({
    userRole: ["owner", "organizer", "participant"],
    joined: null,
    search: searchParams.get("query"),
  });
  const updateQuery = (update) => {
    let newQuery = {
      ...query,
      ...update,
    };
    console.log(newQuery);
    const params = new URLSearchParams(searchParams);
    for (const key in newQuery) {
      if (newQuery.hasOwnProperty(key)) {
        const value = newQuery[key];
        if (value === null || value?.length === 0) {
          params.delete(key);
        } else {
          params.set(key, newQuery[key]);
        }
        console.log(`Key: ${key}, Value: ${value}`);
      }
    }

    router.replace(`${pathname}?${params.toString()}`);
    setQuery(newQuery);
  };
  return (
    <>
      {searchParams.get("userRole") && (
        <span className="pl-3 pr-5 bg-blue-500 rounded-full text-white flex items-center">
          <button
            name="remove filter"
            onClick={(e) => {
              const params = new URLSearchParams(searchParams);
              params.delete("userRole");
              router.replace(`${pathname}?${params.toString()}`);
            }}
          >
            <XMarkIcon className="size-5" />
          </button>
          {searchParams.get("userRole")}
        </span>
      )}
      {searchParams.get("joined") && (
        <span className="pl-3 pr-5 bg-red-accent rounded-full text-white flex items-center">
          <button
            name="remove filter"
            onClick={(e) => {
              const params = new URLSearchParams(searchParams);
              params.delete("joined");
              router.replace(`${pathname}?${params.toString()}`);
            }}
          >
            <XMarkIcon className="size-5" />
          </button>
          {searchParams.get("joined")}
        </span>
      )}
      <div className="flex gap-2 items-center">
        <ThemedInput
          type="text"
          className="!py-0"
          placeholder="Search for a user"
          value={query.search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
            console.log(e.currentTarget.value === "");
            const params = new URLSearchParams(searchParams);
            if (e.currentTarget.value === "") {
              params.delete("query");
            } else {
              params.set("query", e.currentTarget.value);
            }
            router.replace(`${pathname}?${params.toString()}`);
          }}
        />
        <button
          onClick={() => {
            // Search stuff...
          }}
        >
          <MagnifyingGlassIcon className="size-5 hover:stroke-red-accent transition-colors" />
        </button>
      </div>
      <div className="flex gap-5">
        <div className="relative">
          <motion.button
            animate={dropDownStatus.userRole ? "opened" : "closed"}
            onClick={() => {
              setDropDownStatus({
                ...dropDownStatus,
                userRole: !dropDownStatus.userRole,
              });
            }}
            name="Filter responses"
            className="flex items-center gap-2 border px-2 border-gray rounded border-dashed"
          >
            User Role{" "}
            <motion.span
              variants={MenuIconVariants}
              transition={{ duration: 0.2 }}
            >
              <ChevronUpIcon className="size-4" />
            </motion.span>
          </motion.button>
          {dropDownStatus.userRole && (
            <UserRoleDropdown query={query} updateQuery={updateQuery} />
          )}
        </div>
        <div className="relative">
          <motion.button
            animate={dropDownStatus.joinedAt ? "opened" : "closed"}
            onClick={() => {
              setDropDownStatus({
                ...dropDownStatus,
                joinedAt: !dropDownStatus.joinedAt,
              });
            }}
            name="Filter responses"
            className="flex items-center gap-2 border px-2 border-gray rounded border-dashed"
          >
            Joined Date{" "}
            <motion.span
              variants={MenuIconVariants}
              transition={{ duration: 0.2 }}
            >
              <ChevronUpIcon className="size-4" />
            </motion.span>
          </motion.button>
          {dropDownStatus.joinedAt && (
            <motion.div className="absolute top-8 right-0 flex flex-col gap-2 bg-white p-3 rounded-lg shadow items-start">
              <button
                onClick={(e) => {
                  updateQuery({ joined: "ascending" });
                }}
                className="border-b border-gray w-full text-left"
              >
                Ascending{" "}
              </button>
              <button
                onClick={(e) => {
                  updateQuery({ joined: "descending" });
                }}
                className="border-b border-gray w-full text-left"
              >
                Descending{" "}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
export function SelectedMenu({ selectedUsers, setSelectedUsers, eventSlug }) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <button
        onClick={async () => {
          setSelectedUsers([]);
          router.refresh();
        }}
        name={`Delete ${selectedUsers.length} responses`}
        className="text-gray border px-2 border-gray rounded border-dashed"
      >
        Clear selection
      </button>
      <button
        onClick={async () => {
          await promoteUsersAction(selectedUsers, params.eventId);
          setSelectedUsers([]);
          router.refresh();
        }}
        name={`Delete ${selectedUsers.length} responses`}
        className="text-red-accent border px-2 border-red-accent rounded border-dashed"
      >
        Promote {selectedUsers.length} user
        {selectedUsers.length > 1 && "s"}
      </button>
      <button
        onClick={async () => {
          await demoteUsersAction(selectedUsers, params.eventId);
          setSelectedUsers([]);
          router.refresh();
        }}
        name={`Delete ${selectedUsers.length} responses`}
        className="text-warning border px-2 border-warning rounded border-dashed"
      >
        Demote {selectedUsers.length} user{selectedUsers.length > 1 && "s"}
      </button>
      <button
        onClick={async () => {
          await banUsersAction(selectedUsers, params.eventId);
          setSelectedUsers([]);
          router.refresh();
        }}
        name={`Delete ${selectedUsers.length} responses`}
        className="text-warning border px-2 border-warning rounded"
      >
        Ban {selectedUsers.length} user{selectedUsers.length > 1 && "s"}
      </button>
    </>
  );
}
