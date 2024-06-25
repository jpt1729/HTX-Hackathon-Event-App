"use client";
import { useFormState } from "react-dom";
import { useRouter, usePathname } from "next/navigation";

import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { useModal } from "@/utils/context/ModalContext";
import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";

import { addEventAction } from "./actions";

const ModalContent = ({ close }) => {
  //TODO: QR CODE feature
  //TODO: Verify submissions
  //TODO: Close modal on success
  //TODO: Success message not in red
  const router = useRouter()
  const pathname = usePathname()
  const [state, formAction] = useFormState(addEventAction, {
    status: "Not Submitted",
    message: "",
  });
  if (state.status === 'success') {
    close()
    router.refresh()
  }
  return (
    <div>
      <form action={formAction} autocomplete="off">
        <ThemedLabels type="subheading">Add event</ThemedLabels>
        <br />
        <br />
        <div className="flex gap-2">
          <ThemedInput type="text" name="event-slug" placeholder="Event ID" />
          <ThemedInput type="submit" />
        </div>
        <ThemedLabels
            type="subtext"
            aria-live="polite"
            className="!text-warning font-bold pl-5 !text-sm"
          >
            {state.message}
          </ThemedLabels>
      </form>
    </div>
  );
};

export default function AddEvent({ userId }) {
  const { showModal, hideModal } = useModal();
  return (
    <button
      onClick={(e) => {
        showModal(<ModalContent close={hideModal}/>);
      }}
      className="absolute right-5 bottom-5 bg-red-accent p-2 rounded-full hover:scale-110 transition-transform"
    >
      <SquaresPlusIcon className="size-8 stroke-white" />
    </button>
  );
}
