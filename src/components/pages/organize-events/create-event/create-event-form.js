"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";

import { createEventAction } from './action'
import { useModal } from "@/utils/context/ModalContext";

import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";
import ThemedText from "@/components/ThemedText";

export default function CreateEventForm({ }) {

  const { showModal } = useModal();

  const [times, setTimes] = useState({
    startTime: '',
    endTime: '',
  });

  const [description, setDescription] = useState("")
  const [state, action] = useFormState(createEventAction, {
    status: "",
    message: "",
    errors: {},
  });

  if (state.status === "success") {
    showModal(
      <div>
        <ThemedText>{state.status.message}</ThemedText>
      </div>
    );
  }
  if (state.status === "error" && state.message !== "") {
    showModal(
      <div>
        <ThemedText>{state.status.message}</ThemedText>
      </div>
    );
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
          />
        </div>
        <div className="flex flex-col">
          <ThemedLabels className="font-bold">Google Maps Link</ThemedLabels>
          <ThemedInput
            type="text"
            name="google-maps-link"
            placeholder="https://maps.app.goo.gl/7v3EPoBYKBGnocZ87"
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
              required
            />
            {state.errors["slug"] && (
              <ThemedLabels type="subtext" className="text-warning">
                {state.errors["slug"]}
              </ThemedLabels>
            )}
          </span>
        </div>
      </div>
      <ThemedInput type="submit" value="save" className="w-fit" />
    </form>
  );
}
