"use client"
import Link from "next/link";
import { PencilSquareIcon, ChatBubbleLeftEllipsisIcon, MinusIcon } from "@heroicons/react/24/outline";
import { deleteContent } from "./action";
import { usePathname, useRouter } from "next/navigation";

export default function EditBar({ id }){
    const pathname = usePathname();
    const router = useRouter();
    return (
      <>
      <button
        onClick={async (e) => {
          await deleteContent(id)
          router.refresh()
        }}
      >
        <MinusIcon className="size-6"/>
      </button>
      <div>
        <Link title='View Responses' href={`${pathname}/admin?id=${id}`}>
          <ChatBubbleLeftEllipsisIcon className="size-6"/>
        </Link>
        <Link title='Edit Content' href={`${pathname}/admin/edit-content?id=${id}`}>
          <PencilSquareIcon className="size-6" />
        </Link>
      </div>
      </>
    )
}