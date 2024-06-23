"use client";
import { useState } from "react";
import ThemedText from "@/components/ThemedText";
import UserCard from "./user-card";

export default function ResponseViewRow({ activityResponse, handleSelect }) {
  const [checked, setChecked] = useState(false);
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
              handleSelect(activityResponse.id)
            }}
          />
        </div>
      </td>
      <td>
        <ThemedText>{activityResponse.id}</ThemedText>
      </td>
      <td>
        <ThemedText>{activityResponse.activitycontentId}</ThemedText>
      </td>
      <td>
        <ThemedText>{activityResponse.response}</ThemedText>
      </td>
      <td>
        <UserCard user={activityResponse.user} />
      </td>
    </tr>
  );
}
