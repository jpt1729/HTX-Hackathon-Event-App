import { useState } from "react";

import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";

import { formatDateTime } from "@/utils";

export default function CreateActivity({ start, end }) {
  const [times, setTimes] = useState({
    startTime: formatDateTime(start),
    endTime: formatDateTime(end),
  });
  const now = new Date()
  console.log(times)
  return (
    <form className="w-full max-w-screen-sm">
      <ThemedLabels className="font-bold">Title</ThemedLabels>
      <br />
      <ThemedInput
        className="w-full"
        type="text"
        name="title"
        placeholder="SWE Q&A Panel"
      ></ThemedInput>
      <br />
      <br />
      <ThemedLabels className="font-bold">Slug</ThemedLabels>
      <br />
      <ThemedInput
        className="w-full"
        type="text"
        name="slug"
        placeholder="swe-qa-panel"
      ></ThemedInput>
      <br />
      <br />
      <ThemedLabels className="font-bold">Start Time</ThemedLabels>
      <br />
      <input
        type="datetime-local"
        name="start-time"
        defaultValue={times.startTime}
        onChange={(e) => {
          setTimes({
            ...times,
            startTime: e.target.value,
          });
        }}
        min={formatDateTime(now)}
        max={times.endTime}
        required
      />
      <br />
      <br />
      <ThemedLabels className="font-bold">End Time</ThemedLabels>
      <br />
      <input
        type="datetime-local"
        name="end-time"
        defaultValue={times.endTime}
        onChange={(e) => {
          setTimes({
            ...times,
            endTime: e.target.value,
          });
        }}
        min={times.start}
        required
      />
    </form>
  );
}
