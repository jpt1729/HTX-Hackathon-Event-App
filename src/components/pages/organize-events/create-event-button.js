import Link from "next/link";

import { SquaresPlusIcon } from "@heroicons/react/24/outline";

export default function CreateEventButton({ }) {
  return (
    <Link
        href={'/organize-events/create-event'}
      className="absolute right-5 bottom-5 bg-red-accent p-2 rounded-full hover:scale-110 transition-transform"
    >
      <SquaresPlusIcon className="size-8 stroke-white" />
    </Link>
  );
}
