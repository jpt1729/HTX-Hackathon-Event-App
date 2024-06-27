"use client";
import { useFormState } from "react-dom";
import Image from "next/image";

import { updateSettingsAction } from "./action";

import styles from './settings.module.css';

import { PencilIcon } from "@heroicons/react/24/outline";

import ThemedInput from "@/components/ThemedText/input";
import ThemedLabels from "@/components/ThemedText/labels";

export function SettingsForm({ session }) {
  const [state, action] = useFormState(updateSettingsAction, {
    status: "",
    message: "",
    errors: {},
  });
  return (
    <form action={action}>
      <ThemedLabels className="font-bold">Name</ThemedLabels>
      <br />
      <ThemedInput type="text" name="name" defaultValue={session.user.name} />
      <br />
      <br />
      <ThemedLabels className="font-bold">Email</ThemedLabels>
      <br />
      <ThemedInput type="text" name="name" defaultValue={session.user.email} />
      <br />
      <ThemedLabels className="font-bold">Profile Picture</ThemedLabels>
      <br />
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
          <PencilIcon className={`${styles.profileIcon} size-6 stroke-white opacity-0 transition-opacity`}/>
        </label>
        <input
          className="hidden"
          id="pfp-upload"
          name="pfp-upload"
          type="file"
        />
      </div>
      <br />
    </form>
  );
}
