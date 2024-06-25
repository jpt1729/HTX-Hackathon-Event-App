"use client";
import ThemedText from "@/components/ThemedText";
import { useModal } from "@/utils/context/ModalContext";
import { leaveEventAction } from "./actions";
import { useRouter } from "next/navigation";

const ModalContent = ({ close, eventId }) => {
  const router = useRouter();
  return (
    <div>
      <ThemedText className="font-bold">
        Are you sure you want to leave?
      </ThemedText>
      <ThemedText>You may not be able to rejoin</ThemedText>
      <div className="flex gap-3">
        <button
          onClick={() => {
            leaveEventAction(eventId);
            router.push('/events')
            close();
          }}
          className="text-warning border px-2 border-warning rounded border-dashed"
        >
          Yes
        </button>
        <button
          onClick={() => {
            close();
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default function LeaveEvent({ eventId }) {
  const { showModal, hideModal } = useModal();
  return (
    <button
      onClick={(e) => {
        showModal(<ModalContent close={hideModal} eventId={eventId} />);
      }}
      className="text-warning border px-2 py-1 border-warning rounded border-dashed"
    >
      Leave Event
    </button>
  );
}
