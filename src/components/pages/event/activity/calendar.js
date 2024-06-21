"use client";
import React, { useState, useCallback, useMemo } from "react";

import ThemedText from "@/components/ThemedText";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);
const Event = ({ event }) => {
  const pathname = usePathname();
  const activity = event; // changing react-big calendar's wording to ours
  return (
    <Link href={`${pathname}/${activity.slug}`}>
      <ThemedText className="font-bold !leading-none">{activity.title}</ThemedText>
      <ThemedText className="!leading-none">{activity.description}</ThemedText>
    </Link>
  );
};
const EventWrapper = ({ event, children }) => {
    const activity = event;
    return (
        <>
            {children}
        </>
    )
}
const None = () => <></>
export default function CustomCalendar({ activities, eventData }) {
  const { defaultDate, scrollToTime, components } = useMemo(
    () => ({
      defaultDate: new Date(2024, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
      components: {
        event: Event,
        eventWrapper: EventWrapper,
      },
    }),
    []
  );

  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(eventData.startTime);

  return (
    <div className="h-[calc(100vh-68px-20px-20px)] pt-5">
      <Calendar
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultDate={defaultDate}
        localizer={localizer}
        events={activities}
        scrollToTime={scrollToTime}
        defaultView={view}
        view={view} // Include the view prop
        date={date} // Include the date prop
        onView={(view) => setView(view)}
        onNavigate={(date) => {
          setDate(new Date(date));
        }}
        components={components}
      />
    </div>
  );
}
