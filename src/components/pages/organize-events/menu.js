"use client";
import {
  UserGroupIcon,
  EllipsisHorizontalCircleIcon,
  PencilSquareIcon,
  ViewColumnsIcon
} from "@heroicons/react/24/outline";
import ThemedText from "@/components/ThemedText";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu({}) {
  const pathname = usePathname();
  return (
    <div className="h-6 w-full mt-2 flex gap-3 items-center justify-between">
      <div className="flex gap-3 items-center">
        <Link
          href={`${pathname}/view-participants`}
          className="flex gap-1 hover:text-red-accent hover:stroke-red-accent transition-colors hover:underline"
        >
          <UserGroupIcon className="size-6" />
          <ThemedText>View Participants</ThemedText>
        </Link>
        <Link
          href={`${pathname}/activity`}
          className="flex gap-1 hover:text-red-accent hover:stroke-red-accent transition-colors hover:underline"
        >
          <ViewColumnsIcon className="size-6" />
          <ThemedText>Activities</ThemedText>
        </Link>
        <Link
          href={`${pathname}/edit-content`}
          className="flex gap-1 hover:text-red-accent hover:stroke-red-accent transition-colors hover:underline"
        >
          <PencilSquareIcon className="size-6" />
          <ThemedText>Edit Content</ThemedText>
        </Link>
      </div>
      <Link
        href={`${pathname}/options`}
        className="flex gap-1 hover:text-red-accent hover:stroke-red-accent transition-colors hover:underline"
      >
        <EllipsisHorizontalCircleIcon className="size-6" />
        <ThemedText>Options</ThemedText>
      </Link>
    </div>
  );
}
