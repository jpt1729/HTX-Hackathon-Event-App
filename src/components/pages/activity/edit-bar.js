"use client"
import Link from "next/link";
import { PencilSquareIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function EditBar({ id }){
    const pathname = usePathname()
    return (
      <>
      <Link title='View Responses' href={`${pathname}/admin?id=${id}`}>
        <ChatBubbleLeftEllipsisIcon className="size-6"/>
      </Link>
      <Link title='Edit Content' href={`${pathname}/admin/edit-content?id=${id}`}>
        <PencilSquareIcon className="size-6" />
      </Link>
      </>
    )
}