"use client";
import React, { useState, useCallback, useMemo } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

import ThemedText from "@/components/ThemedText";
import Toolbar from "./toolbar";
import { EventDay } from "./event";

import CreateActivity from "./create-activity";
import { useModal } from "@/utils/context/ModalContext";

const Event = ({ event }) => {
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

export default function CustomOrganizerCalendar({ activities, eventData }) {
  const [events, setEvents] = useState(activities)
  const { defaultDate, scrollToTime, components } = useMemo(
    () => ({
      defaultDate: new Date(2024, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
      components: {
        event: Event,
        toolbar: Toolbar,
        day: {
          event: EventDay,
        },
      },
    }),
    []
  );

  const { showModal } = useModal();

  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(eventData.startTime);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      showModal(<CreateActivity start={start} end={end}/>)
      setEvents((prev) => [...prev, { start, end, title:'title' }])
    },
    [setEvents, showModal]
  )

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  return (
    <>
      <Calendar
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultDate={defaultDate}
        localizer={localizer}
        events={events}
        scrollToTime={scrollToTime}
        defaultView={view}
        onSelectSlot={handleSelectSlot}
        view={view} // Include the view prop
        date={date} // Include the date prop
        onView={(view) => setView(view)}
        onNavigate={(date) => {
          setDate(new Date(date));
        }}
        components={components}
        selectable
      />
    </>
  );
}
