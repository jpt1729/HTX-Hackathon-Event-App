import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import ThemedText from "@/components/ThemedText";
import { formatTime } from "@/utils/index.js";

export default function CalendarWidget({eventTime}){
    return (
        <div className="flex gap-1">
          <CalendarDaysIcon className="size-6" />
          <ThemedText icon="location_on" type="paragraph">
            {formatTime(eventTime.startTime)} - {formatTime(eventTime.endTime)}
          </ThemedText>
        </div>
    )
}