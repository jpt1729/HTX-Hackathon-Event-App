"use client";
import React, { useState } from "react";

import ThemedText from "@/components/ThemedText";

import ResponseViewRow from "./ResponseViewRow";

import { deleteResponses } from "./action";

function SelectedMenu({ selectedResponses }) {
    console.log(selectedResponses)
  return (
    <>
      <button
        onClick={() => {
          //delete stuff :()
          deleteResponses(selectedResponses);
        }}
        className="text-warning border px-2 py-1 border-warning rounded border-dashed"
      >
        Delete {selectedResponses.length} responses
      </button>
    </>
  );
}

export default function ResponseViewTable({ activityResponses }) {
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
      <div>
        <SelectedMenu selectedResponses={selectedResponses} />
      </div>
      <table className="w-full border-spacing-y-5">
        <thead>
          <tr className="border-2 border-b-gray border-x-0 border-t-0">
            <th className="w-[5%]">{/*Left purposely blank*/}</th>
            <th className="w-[20%]">
              <ThemedText className="font-bold">id</ThemedText>
            </th>
            <th className="w-[20%]">
              <ThemedText className="font-bold">content id</ThemedText>
            </th>
            <th className="w-[40%]">
              <ThemedText className="font-bold">Response</ThemedText>
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
