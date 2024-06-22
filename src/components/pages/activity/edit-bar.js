"use client"
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function EditBar({ id }){
    const pathname = usePathname()
    return (
        <Link href={`${pathname}/admin/edit-content?id=${id}`}>
        <PencilSquareIcon className="size-6" />
      </Link>
    )
}