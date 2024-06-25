"use client";
import Link from "next/link";
import {
  UserGroupIcon,
  EllipsisHorizontalCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import ThemedText from "@/components/ThemedText";
import { usePathname } from "next/navigation";

export default function ActivityMenu({ admin }) {
  const pathname = usePathname();
  return (
    <div className="h-6 w-full mt-2 flex gap-3 items-center justify-between">
      <div className="flex gap-3 items-center">
        <Link
          href={`${pathname}/view-participants`}
          className="flex gap-1 hover:text-red-accent hover:stroke-red-accent transition-colors hover:underline"
        >
          <UserGroupIcon className="size-6" />
          <ThemedText>Activity Participants</ThemedText>
        </Link>
        {admin && (
          <Link
            href={`${pathname}/admin/edit-content`}
            className="flex gap-1 hover:text-red-accent hover:stroke-red-accent transition-colors hover:underline"
          >
            <PencilSquareIcon className="size-6" />
            <ThemedText>Edit Content</ThemedText>
          </Link>
        )}
      </div>
      <Link
        href={`${pathname}/admin`}
        className="flex gap-1 hover:text-red-accent hover:stroke-red-accent transition-colors hover:underline"
      >
        <EllipsisHorizontalCircleIcon className="size-6" />
        <ThemedText>Options</ThemedText>
      </Link>
    </div>
  );
}
