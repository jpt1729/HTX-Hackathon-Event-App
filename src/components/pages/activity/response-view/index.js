"use client";
import { useState } from "react";
import ThemedText from "@/components/ThemedText";
import UserCard from "./user-card";

export default function ResponseViewRow({ activityResponse }) {
  const [checked, setChecked] = useState(false);
  return (
    <tr className={`${checked && 'bg-gray'}`}>
      <td>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {setChecked(!checked)}}
        />
      </td>
      <td>
        <ThemedText>{activityResponse.id}</ThemedText>
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
