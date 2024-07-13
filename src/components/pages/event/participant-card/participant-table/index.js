"use client";
import { useState } from "react";
import ThemedText from "@/components/ThemedText";
import ParticipantView from "./ParticipantView";
import { NonSelectedMenu, SelectedMenu } from "./menus";

export default function ParticipantTable({ eventParticipants }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleSelect = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id],
    );
  };
  return (
    <>
      <div className="w-full relative flex justify-end gap-3">
        {selectedUsers.length > 0 ? (
          <SelectedMenu selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
        ) : (
          <NonSelectedMenu />
        )}
      </div>
      <table className="w-full border-spacing-y-5">
        <thead>
          <tr className="border-2 border-b-gray border-x-0 border-t-0">
            <th className="w-[2%]">{/*Left purposely blank*/}</th>
            <th className="w-[15%]">
              <ThemedText className="font-bold">id</ThemedText>
            </th>
            <th className="w-[15%]">
              <ThemedText className="font-bold">name</ThemedText>
            </th>
            <th className="w-[23%]">
              <ThemedText className="font-bold">email</ThemedText>
            </th>
            <th className="w-[5%]">
              <ThemedText className="font-bold">role</ThemedText>
            </th>
            <th className="w-[15%]">
              <ThemedText className="font-bold">joined</ThemedText>
            </th>
          </tr>
        </thead>
        <tbody>
          {eventParticipants &&
            eventParticipants.map((participant, _i) => {
              return (
                <ParticipantView
                  key={_i}
                  participant={participant}
                  handleSelect={handleSelect}
                />
              );
            })
            //create an empty response screen...
            }
        </tbody>
      </table>
    </>
  );
}
