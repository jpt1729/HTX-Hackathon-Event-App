"use client";
import { useState } from "react";
import { useFormState } from "react-dom";

import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";

import { formatDateTime } from "@/utils";

import createActivityAction from "./action";

export default function CreateActivityFrom({ start, end }) {
  const [description, setDescription] = useState("");
  const [times, setTimes] = useState({
    startTime: start ? start : "",
    endTime: end ? end : "",
  });
  const [state, formAction] = useFormState(createActivityAction, {
    status: "",
    message: "",
    errors: {

    }
  });
  const now = new Date();

  return (
    <form className="w-full max-w-screen-sm" action={formAction}>
      <div>
        <ThemedLabels className="font-bold">Title *</ThemedLabels>
        <br />
        <ThemedInput
          className="w-full"
          type="text"
          name="title"
          placeholder="SWE Q&A Panel"
        ></ThemedInput>
      </div>
      <br />
      <div>
        <ThemedLabels className="font-bold">Slug *</ThemedLabels>
        <br />
        <ThemedInput
          className="w-full"
          type="text"
          name="slug"
          placeholder="swe-qa-panel"
        ></ThemedInput>
      </div>
      <br/>
      <div className="flex flex-col gap-1 w-full">
        <ThemedLabels className="font-bold">Description *</ThemedLabels>
        <textarea
          name="description"
          placeholder="SWE Q&A in 66-319"
          className="resize-none p-3 rounded-lg border border-gray active:border-red-accent focus:border-red-accent outline-none transition-colors"
          rows="3"
          cols="15"
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= 250) {
              setDescription(e.target.value);
            }
          }}
        ></textarea>
        <ThemedLabels
          type="subtext"
          className={`${
            description.length >= 250 && "text-warning"
          } transition-colors`}
        >
          {description.length}/250 Characters
        </ThemedLabels>
        {state.errors["description"] && (
          <ThemedLabels type="subtext" className="text-warning">
            {state.errors["description"]}
          </ThemedLabels>
        )}
      </div>
      <br />
      <div>
        <ThemedLabels className="font-bold">Start Time *</ThemedLabels>
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
      </div>
      <br />
      <div>
        <ThemedLabels className="font-bold">End Time *</ThemedLabels>
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
      </div>
      <br/>
      <br/>
      <ThemedInput type="submit" value="Create activity" />
    </form>
  );
}
