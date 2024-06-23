"use client";
import { useState } from "react";
import { useFormState } from "react-dom";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useModal } from "@/utils/context/ModalContext";

import ThemedText from "@/components/ThemedText";
import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";

import { editMCAction } from "./action";

export default function EditMC({ activityContent }) {
  const [options, setOptions] = useState(
    activityContent?.content?.options ? activityContent?.content?.options : []
  );
  const [newOption, setNewOption] = useState("");
  const [state, formAction] = useFormState(editMCAction, {
    status: "",
    message: "",
    errors: {},
  })
  
  return (
    <form action={formAction}>
      <ThemedLabels type="subheading">Title</ThemedLabels>
      <br />
      <ThemedInput
        type="text"
        name="title"
        defaultValue={activityContent.title}
        className="w-full max-w-screen-sm"
      />
      <br />
      <br />
      <ThemedLabels type="subheading" className="font-bold">
        Options
      </ThemedLabels>
      <br />
      <div className="flex flex-col gap-5">
        {options.map((option, _i) => {
          return (
            <div key={_i} className="flex items-center gap-1">
              <button
                title={`Remove option ${_i + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  let updatedOptions = [...options];
                  updatedOptions.splice(_i, 1);
                  setOptions(updatedOptions);
                }}
              >
                <MinusIcon className="size-6" />
              </button>
              <ThemedLabels>Option {_i + 1}: </ThemedLabels>
              <ThemedInput
                type="text"
                name={`option-${_i}`}
                defaultValue={option}
              />
            </div>
          );
        })}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.preventDefault();
              let updatedOptions = [...options];
              if (options.includes(newOption) || newOption === "") {
                return;
              }
              updatedOptions.push(newOption);
              setOptions(updatedOptions);
              setNewOption("");
            }}
          >
            <PlusIcon className="size-6" />
          </button>
          <ThemedLabels>Option {options.length + 1}: </ThemedLabels>
          <ThemedInput
            type="text"
            placeholder="New option"
            value={newOption}
            onChange={(e) => {
              setNewOption(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                let updatedOptions = [...options];
                if (options.includes(newOption) || newOption === "") {
                  return;
                }
                updatedOptions.push(newOption);
                setOptions(updatedOptions);
                setNewOption("");
              }
            }}
          />
        </div>
      </div>
      <ThemedInput type="submit" value="save" />
      <input type='text' className="hidden" name='id' value={activityContent.id} readOnly/>
    </form>
  );
}
