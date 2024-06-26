"use client";
import { useState } from "react";
import ThemedText from "@/components/ThemedText";
import UserCard from "./user-card";

import { formatTime } from "@/utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";


export default function ResponseViewRow({ activityResponse, handleSelect }) {
  const [checked, setChecked] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <tr className={`${checked && "bg-red-accent/5"} border-b border-gray`}>
      <td>
        <div className="flex justify-center items-center">
          <input
            type="checkbox"
            className="m-auto"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              handleSelect(activityResponse.id);
            }}
          />
        </div>
      </td>
      <td className='border-l border-gray pl-1'>
        <ThemedText>{activityResponse.id}</ThemedText>
      </td>
      <td className='border-l border-gray pl-1'>
        <button
          onClick={(e) => {
            const params = new URLSearchParams(searchParams);
            params.set("id", activityResponse.activitycontentId);
            router.replace(`${pathname}?${params.toString()}`);
          }}
        >
          <ThemedText>{activityResponse.activitycontentId}</ThemedText>
        </button>
      </td>
      <td className='border-l border-gray pl-1'>
        <ThemedText>{activityResponse.response}</ThemedText>
      </td>
      <td className='border-l border-gray pl-1'>
        <ThemedText>{formatTime(activityResponse.createdAt)}</ThemedText>
      </td>
      <td className='border-l border-gray pl-1'>
        <UserCard user={activityResponse.user} />
      </td>
    </tr>
  );
}
