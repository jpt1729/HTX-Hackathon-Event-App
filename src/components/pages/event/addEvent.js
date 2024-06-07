"use client";
import { useFormState } from "react-dom";

import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { useModal } from "@/utils/context/ModalContext";
import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";

import { addEvent } from "./actions";

const ModalContent = ({}) => {
  //TODO: QR CODE feature
  //TODO: Verify submissions

  const [state, formAction] = useFormState(addEvent, {
    message: "",
  });
  console.log(state);
  return (
    <div>
      <form action={formAction}>
        <ThemedLabels type="subheading">Add an Event</ThemedLabels>
        <br />
        <br />
        <div className="flex gap-2">
          <ThemedInput type="text" name="eventId" placeholder="Event ID" />

          <ThemedInput type="submit" />
        </div>
        <ThemedLabels
            type="subtext"
            aria-live="polite"
            className="!text-warning font-bold pl-5"
          >
            {state.message}
          </ThemedLabels>
      </form>
    </div>
  );
};

export default function AddEvent({ userId }) {
  const { showModal } = useModal();
  return (
    <button
      onClick={(e) => {
        showModal(<ModalContent />);
      }}
      className="absolute right-5 bottom-5 bg-red-accent p-2 rounded-full hover:scale-110 transition-transform"
    >
      <SquaresPlusIcon className="size-8 stroke-white" />
    </button>
  );
}
