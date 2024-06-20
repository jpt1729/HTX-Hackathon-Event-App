"use client";

import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";

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

export default function OptionsForm({ eventData }){
    return (
        <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1 w-1/2">
          <ThemedLabels type="subheading">Event Details</ThemedLabels>
          <div className="flex flex-col">
            <ThemedLabels className="font-bold">Title</ThemedLabels>
            <ThemedInput
              type="text"
              placeholder="Title"
              value={eventData?.title}
            />
          </div>
          <div className="flex flex-col">
            <ThemedLabels className="font-bold">Description</ThemedLabels>
            <ThemedInput
              type="text"
              placeholder="Description"
              value={eventData?.description}
            />
          </div>
          <div className="flex flex-col">
            <ThemedLabels className="font-bold">Event Start Time</ThemedLabels>
            <input type="datetime-local" value={formatDateTime(eventData.startTime)} />
          </div>
          <div className="flex flex-col">
            <ThemedLabels className="font-bold">Event End Time</ThemedLabels>
            <input type="datetime-local" value={formatDateTime(eventData.endTime)} />
          </div>
        </div>
        <ThemedLabels type="subheading">Event Details</ThemedLabels>
        <div className="flex flex-col gap-1 w-1/2">
          <ThemedLabels className="font-bold">Title</ThemedLabels>
          <ThemedInput
            type="text"
            placeholder="Title"
            value={eventData?.title}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <ThemedLabels className="font-bold">Description</ThemedLabels>
          <ThemedInput
            type="text"
            placeholder="Description"
            value={eventData?.description}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <ThemedLabels type="subheading">Location</ThemedLabels>
          <div className="flex flex-col">
            <ThemedLabels className="font-bold">Address</ThemedLabels>
            <ThemedInput
              type="text"
              placeholder="Description"
              value={eventData?.location?.address}
            />
          </div>
          <div className="flex flex-col">
            <ThemedLabels className="font-bold">Google Maps Link</ThemedLabels>
            <ThemedInput
              type="text"
              placeholder="Google Maps Link"
              value={eventData?.location?.googleMapsLink}
            />
          </div>
        </div>
      </form>
    )
}