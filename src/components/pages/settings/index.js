"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";

import { updateSettingsAction } from "./action";

import styles from "./settings.module.css";

import { PencilIcon } from "@heroicons/react/24/outline";

import ThemedInput from "@/components/ThemedText/input";
import ThemedLabels from "@/components/ThemedText/labels";

export function SettingsForm({ session }) {
  const [state, action] = useFormState(updateSettingsAction, {
    status: "",
    message: "",
    errors: {},
  });

  const [description, setDescription] = useState(
    session?.user?.description || ""
  );
  return (
    <form action={action} className="flex flex-col gap-5 max-w-screen-sm">
      <div className="flex gap-5">
        <div className="flex flex-col gap-1">
          <div className="relative">
            <Image
              src={session.user.image}
              alt="Your profile picture"
              width={128}
              height={128}
              className="rounded-full"
            />
            <label
              className={`absolute size-32 aspect-square hover:bg-black/30 top-0 left-0 rounded-full flex justify-center items-center transition-colors ${styles.profileIcon}`}
              htmlFor="pfp-upload"
              type="file"
            >
              <PencilIcon
                className={`${styles.profileIcon} size-6 stroke-white opacity-0 transition-opacity`}
              />
            </label>
            <input
              className="hidden"
              id="pfp-upload"
              name="pfp-upload"
              type="file"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <ThemedLabels className="font-bold">Name</ThemedLabels>
            <ThemedInput
              type="text"
              name="name"
              defaultValue={session?.user?.name}
            />
          </div>
          <div className="flex flex-col gap-1">
            <ThemedLabels className="font-bold">Email</ThemedLabels>
            <ThemedLabels className="font-gray px-5">
              {session?.user?.email}
            </ThemedLabels>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <ThemedLabels className="font-bold">Description</ThemedLabels>
        <textarea
          name="description"
          placeholder=""
          className="resize-none p-3 rounded-lg border border-gray active:border-red-accent focus:border-red-accent outline-none transition-colors"
          rows="6"
          cols="15"
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setDescription(e.target.value);
            }
          }}
        ></textarea>
        <ThemedLabels
          type="subtext"
          className={`${
            description.length >= 500 && "text-warning"
          } transition-colors`}
        >
          {description.length}/500 Characters
        </ThemedLabels>
        {state.errors["description"] && (
          <ThemedLabels type="subtext" className="text-warning">
            {state.errors["description"]}
          </ThemedLabels>
        )}
      </div>
      <ThemedInput type="submit" value="save" className="w-fit"/>
    </form>
  );
}
