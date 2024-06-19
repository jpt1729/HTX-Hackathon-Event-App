import { TrashIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { useModal } from "@/utils/context/ModalContext";
import ThemedInput from "@/components/ThemedText/input";
import ThemedLabels from "@/components/ThemedText/labels";

import { removeUserAction } from "./action";

const RemoveUserForm = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [state, formAction] = useFormState(removeUserAction, {
    status: "",
    message: "",
  });
  if (state.status === "success") {
    close();
    router.refresh(); //todo: add error messages!
  }
  return (
    <form action={formAction}>
      <ThemedLabels>Are you sure you want to remove {user.name}?</ThemedLabels>
      <br />
      <input
        type="text"
        className="hidden"
        name="userId"
        value={user.id}
        readOnly
      />
      <input
        type="text"
        className="hidden"
        name="eventSlug"
        value={pathname.split("/")[2]}
        readOnly
      />
      <ThemedInput type="submit" value="Yes!" />
    </form>
  );
};
export default function RemoveUser({ user }) {
  const { showModal, closeModal } = useModal();
  return (
    <button
      onClick={() => {
        showModal(<RemoveUserForm user={user} close={closeModal} />);
      }}
    >
      <TrashIcon className="size-6 hover:stroke-warning transition-colors" />
    </button>
  );
}
