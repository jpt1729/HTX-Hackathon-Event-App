import { TrashIcon } from "@heroicons/react/24/outline";
import { useModal } from "@/utils/context/ModalContext";

export default function RemoveUser() {
  const { showModal } = useModal();
  return (
    <button
      onClick={() => {
        showModal(<>Remove User?</>);
      }}
    >
      <TrashIcon className="size-6 hover:stroke-warning transition-colors" />
    </button>
  );
}
