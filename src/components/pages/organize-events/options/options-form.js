"use client";
import React, { useState } from "react";

import { useModal } from "@/utils/context/ModalContext";
import { useSearchParams } from 'next/navigation'
import { useFormState } from "react-dom";
import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";
import ThemedText from "@/components/ThemedText";

import { optionsFormAction } from "./action";
import { formatDateTime } from "@/utils";

export default function OptionsForm({ eventData }) {
  const searchParams = useSearchParams()

  const slugChange = searchParams.get('slug-change')
  const { showModal } = useModal()
  const [times, setTimes] = useState({
    startTime: formatDateTime(eventData?.startTime),
    endTime: formatDateTime(eventData?.endTime),
  });
  const [description, setDescription] = useState(eventData?.description);

  const [state, action] = useFormState(optionsFormAction, {
    status: "",
    message: "",
    errors: {},
  });
  
  if (slugChange) {
    showModal(<div><ThemedText>Settings updated successfully!</ThemedText></div>)
  }
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
          <textarea
            name="description"
            placeholder=""
            className="resize-none p-3 rounded-lg border border-gray active:border-red-accent focus:border-red-accent outline-none transition-colors"
            rows="6"
            cols="15"
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= 500){
                setDescription(e.target.value)
              }
            }}
          ></textarea>
          <ThemedLabels type='subtext' className={`${description.length >= 500 && 'text-warning'} transition-colors`}>{description.length}/500 Characters</ThemedLabels>
          {state.errors["description"] && (
            <ThemedLabels type="subtext" className="text-warning">
              {state.errors["description"]}
            </ThemedLabels>
          )}
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
      <div className="flex flex-col gap-1 border-warning border rounded-lg p-5">
        <ThemedLabels type="subheading" className="text-warning">
          Danger Zone
        </ThemedLabels>
        <ThemedLabels type="paragraph" className="">
          You are entering the danger zone. Please ensure you know what you are
          doing before changing anything
        </ThemedLabels>
        <div className="flex flex-col">
          <ThemedLabels className="font-bold">Slug *</ThemedLabels>
          <ThemedLabels type="paragraph" className="">
            After you change your event slug, another organization may take your
            slug.
          </ThemedLabels>
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
