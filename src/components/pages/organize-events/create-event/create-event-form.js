"use client";
import React, { useState } from "react";

import { useModal } from "@/utils/context/ModalContext";
import { useSearchParams } from 'next/navigation'
import { useFormState } from "react-dom";
import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";
import ThemedText from "@/components/ThemedText";

import { formatDateTime } from "@/utils";

export default function CreateEventForm({ eventData }) {
  const searchParams = useSearchParams()

  const slugChange = searchParams.get('slug-change')
  const { showModal } = useModal()
  const [times, setTimes] = useState({
    startTime: formatDateTime(eventData?.startTime),
    endTime: formatDateTime(eventData?.endTime),
  });
  const [state, action] = useFormState(() => {}, {
    status: "",
    message: "",
    errors: {},
  });
  
  if (state.status === "success"){
    showModal(<div><ThemedText>{state.status.message}</ThemedText></div>)
  }
  if (state.status === "error" && state.message !== ""){
    showModal(<div><ThemedText>{state.status.message}</ThemedText></div>)
  }
  return (
    <form
      className="flex flex-col gap-5 w-full max-w-screen-md"
      action={action}
    >
      <div className="flex flex-col gap-1">
        <ThemedLabels type="subheading">Event Details</ThemedLabels>
        {state.message && (
          <ThemedLabels className="text-warning">{state.message}</ThemedLabels>
        )}
        <div className="flex flex-col">
          <ThemedLabels className="font-bold">Title</ThemedLabels>
          <ThemedInput
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={eventData?.title}
          />
        </div>
        <div className="flex flex-col">
          <ThemedLabels className="font-bold">Description</ThemedLabels>
          <ThemedInput
            type="text"
            name="description"
            placeholder="Description"
            defaultValue={eventData?.description}
          />
        </div>
        <div className="flex flex-col">
          <ThemedLabels className="font-bold">Event Start Time</ThemedLabels>
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
            max={times.endTime}
          />
          {state.errors["start-time"] && (
            <ThemedLabels type="subtext" className="text-warning">
              {state.errors["start-time"]}
            </ThemedLabels>
          )}
        </div>
        <div className="flex flex-col">
          <ThemedLabels className="font-bold">Event End Time</ThemedLabels>
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
            min={times.startTime}
          />
          {state.errors["end-time"] && (
            <ThemedLabels type="subtext" className="text-warning">
              {state.errors["end-time"]}
            </ThemedLabels>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <ThemedLabels type="subheading">Location</ThemedLabels>
        <div className="flex flex-col">
          <ThemedLabels className="font-bold">Address</ThemedLabels>
          <ThemedInput
            type="text"
            name="address"
            placeholder="721 Broadway, New York, NY 10003, USA"
            defaultValue={eventData?.location?.address}
          />
        </div>
        <div className="flex flex-col">
          <ThemedLabels className="font-bold">Google Maps Link</ThemedLabels>
          <ThemedInput
            type="text"
            name="google-maps-link"
            placeholder="https://maps.app.goo.gl/7v3EPoBYKBGnocZ87"
            defaultValue={eventData?.location?.googleMapsLink}
          />
          {state.errors["google-maps-link"] && (
            <ThemedLabels type="subtext" className="text-warning">
              {state.errors["google-maps-link"]}
            </ThemedLabels>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 ">
        <div className="flex flex-col">
          <ThemedLabels className="font-bold">Slug</ThemedLabels>
          <span>
            <span>/events/</span>
            <ThemedInput
              type="text"
              name="slug"
              placeholder="hack-htx"
              defaultValue={eventData?.slug}
              required
            />
            {state.errors["slug"] && (
              <ThemedLabels type="subtext" className="text-warning">
                {state.errors["slug"]}
              </ThemedLabels>
            )}
          </span>
        </div>
        <input
          type="text"
          name="event-id"
          value={eventData?.id}
          readOnly
          className="hidden"
        />
      </div>
      <ThemedInput type="submit" value="save" className="w-fit" />
    </form>
  );
}
