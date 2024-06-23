import ThemedText from "@/components/ThemedText";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function EventDay ({ event }) {
const pathname = usePathname();
const activity = event; // changing react-big calendar's wording to ours
return (
    <Link href={`${pathname}/${activity.slug}`}>
        <ThemedText className="font-bold !leading-none">
            {activity.title}
        </ThemedText>
        <ThemedText className="!leading-none">{activity.description}</ThemedText>
    </Link>
);
};