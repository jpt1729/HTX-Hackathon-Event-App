"use client";
import { usePathname, useRouter } from "next/navigation";
import { useFormState } from "react-dom";

import { UserPlusIcon } from "@heroicons/react/24/outline";
import ThemedInput from "@/components/ThemedText/input";
import ThemedLabels from "@/components/ThemedText/labels";
import { useModal } from "@/utils/context/ModalContext";
import { promoteUserAction } from "./action";

const ModalContent = ({ user, close }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [state, formAction] = useFormState(promoteUserAction, {
    status: "",
    message: "",
  });
  if (state.status === "success"){
    close()
    router.refresh() //todo: add error messages!
  };
  return (
    <form action={formAction}>
      <ThemedLabels>Are you sure you want to promote {user.name}?</ThemedLabels>
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

export default function PromoteUser({ user }) {
  const { showModal, closeModal } = useModal();
  return (
    <button
      onClick={() => {
        showModal(<ModalContent user={user} close={closeModal}/>);
        //TODO: Make it so that people can be promoted to make activities and stuff
      }}
    >
      <UserPlusIcon className="size-6 hover:stroke-red-accent transition-colors" />
    </button>
  );
}
