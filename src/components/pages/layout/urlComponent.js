"use client";

import { usePathname } from "next/navigation";
import ThemedText from "../../ThemedText";
import Link from "next/link";

function buildPaths(array) {
  const result = [];
  let path = "";

  for (let i = 0; i < array.length; i++) {
    path += `/${array[i]}`;
    result.push(path);
  }

  return result;
}

export default function URLComponent() {
  const pathname = usePathname();
  let splitPathname = pathname.split("/").slice(1);
  let paths = buildPaths(splitPathname);
  return (
    <ThemedText type="subtext">
      {splitPathname.map((urlSegment, _i) => {
        return (
          <Link
            key={_i}
            href={paths[_i]}
          >
            /{urlSegment}
          </Link>
        );
      })}
    </ThemedText>
  );
}
