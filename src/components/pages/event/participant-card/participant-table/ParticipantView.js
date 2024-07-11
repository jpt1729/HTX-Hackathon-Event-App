"use client";
import { useState } from "react";

import Image from "next/image";
import ThemedText from "@/components/ThemedText";

import { formatTime } from "@/utils";

export default function ParticipantView({ participant, handleSelect }) {
  const [checked, setChecked] = useState(false);
  console.log(participant)
  return (
    <tr>
      <td>
        <div className="flex justify-center items-center">
          <input
            type="checkbox"
            className="m-auto"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              handleSelect(participant.id);
            }}
          />
        </div>
      </td>
      <td>
        <ThemedText>{participant.id}</ThemedText>
      </td>
      <td className="flex items-center gap-1">
        <Image
          src={participant.image}
          width={30}
          height={30}
          alt={`${participant.name}'s profile picture`}
          className="rounded-full"
        />
        <ThemedText>{participant.name}</ThemedText>
      </td>
      <td>
        <ThemedText>{participant.email}</ThemedText>
      </td>
      <td>
        <ThemedText>{participant.role}</ThemedText>
      </td>
      <td>
        <ThemedText>{formatTime(participant.createdAt)}</ThemedText>
      </td>
    </tr>
  );
}
