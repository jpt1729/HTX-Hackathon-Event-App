"use client";
import React, { useState } from "react";

import ThemedText from "@/components/ThemedText";

import ResponseViewRow from "./ResponseViewRow";
import NonSelectedMenu from "./NonSelectedMenu";

import { useRouter } from "next/navigation";

import { deleteResponses } from "./action";

function SelectedMenu({ selectedResponses, setSelectedResponses }) {
  const router = useRouter();
  return (
    <>
      <button
        onClick={async () => {
          //delete stuff :()
          await deleteResponses(selectedResponses);
          router.refresh();
          setSelectedResponses([])
        }}
        name={`Delete ${selectedResponses.length} responses`}
        className="text-warning border px-2 border-warning rounded border-dashed"
      >
        Delete {selectedResponses.length} responses
      </button>
    </>
  );
}

export default function ResponseViewTable({ activityResponses, searchParams }) {
  const { id, sort } = searchParams;
  const [selectedResponses, setSelectedResponses] = useState([]);
  const handleSelect = (id) => {
    setSelectedResponses((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };
  return (
    <>
      <div className="w-full relative flex justify-end gap-3">
        {selectedResponses.length > 0 ? (
          <SelectedMenu selectedResponses={selectedResponses} setSelectedResponses={setSelectedResponses} />
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
              <ThemedText className="font-bold">content id</ThemedText>
            </th>
            <th className="w-[28%]">
              <ThemedText className="font-bold">Response</ThemedText>
            </th>
            <th className="w-[15%]">
              <ThemedText className="font-bold">CreatedAt</ThemedText>
            </th>
            <th className="w-[15%]">
              <ThemedText className="font-bold">user</ThemedText>
            </th>
          </tr>
        </thead>
        <tbody className="border-spacing-y-1">
          {activityResponses &&
            activityResponses.map((activityResponse) => {
              return (
                <ResponseViewRow
                  key={activityResponse.id}
                  activityResponse={activityResponse}
                  handleSelect={handleSelect}
                />
              );
            })}
        </tbody>
      </table>
    </>
  );
}
