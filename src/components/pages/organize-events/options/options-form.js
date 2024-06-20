"use client";
import React, { useState } from "react";

import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";

import { action } from "./action";

function formatDateTime(input) {
  const date = new Date(input);

  // Extract year, month, day, hour, and minutes
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  // Construct the desired format
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function OptionsForm({ eventData }) {

    const [times, setTimes] = useState({
        startTime: formatDateTime(eventData.endTime),
        endTime: formatDateTime(eventData.startTime)
    })
  return (
    <form className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 w-1/2">
        <ThemedLabels type="subheading">Event Details</ThemedLabels>
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
            name="event-start-time"
            defaultValue={times.startTime}
            onChange={(e) => {
                setTimes({
                    ...times,
                    startTime:e.target.value,
                    
                })
                console.log(times)
            }}
            max={times.endTime}
          />
        </div>
        <div className="flex flex-col">
          <ThemedLabels className="font-bold">Event End Time</ThemedLabels>
          <input
            type="datetime-local"
            name="event-end-time"
            defaultValue={times.endTime}
            onChange={(e) => {
                setTimes({
                    ...times,
                    endTime:e.target.value,
                    
                })
                console.log(times)
            }}
            min={times.startTime}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-1/2">
        <ThemedLabels type="subheading">Location</ThemedLabels>
        <div className="flex flex-col">
          <ThemedLabels className="font-bold">Address</ThemedLabels>
          <ThemedInput
            type="text"
            name="address"
            placeholder="Description"
            defaultValue={eventData?.location?.address}
          />
        </div>
        <div className="flex flex-col">
          <ThemedLabels className="font-bold">Google Maps Link</ThemedLabels>
          <ThemedInput
            type="text"
            name="google-maps-link"
            placeholder="Google Maps Link"
            defaultValue={eventData?.location?.googleMapsLink}
          />
        </div>
        <div className="flex flex-col">
          <ThemedLabels className="font-bold">Slug *</ThemedLabels>
          <ThemedInput
            type="text"
            name="slug"
            placeholder="Slug"
            defaultValue={eventData?.slug}
            required
          />
        </div>
      </div>
    </form>
  );
}
