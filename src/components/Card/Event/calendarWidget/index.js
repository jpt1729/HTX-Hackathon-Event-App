"use client";
import React, { useState, useRef } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

import PropTypes from "prop-types";

import ThemedText from "@/components/ThemedText";
import { formatTime } from "@/utils/index.js";
import CalendarDropDown from "./calendarDropdown";

/**
 * EventTime Object
 * @typedef {Object} EventTime
 * @property {Date} startTime - Indicates start time
 * @property {Date} endTime - Indicates end time
 */
/**
 * This component renders an event calendar widget
 * @param {Object} props - Component properties
 * @param {EventTime} [props.eventTime] location of the Event
 * @returns {React.ReactNode} A React element that renders an event calendar widget
 */
export default function CalendarWidget({ event, eventTime }) {
  // TODO: make it so that when on click it opens a small menu where you can add the event to google calendar/ other calendars
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(null);

  return (
    <div
      className="flex gap-1 relative"
      onMouseEnter={() => {
        timerRef.current = setTimeout(() => {
          setIsOpen(true);
        }, 350);
      }}
      onMouseLeave={() => {
        clearTimeout(timerRef.current);
        setIsOpen(false);
      }}
    >
      <CalendarDaysIcon className="size-6" />
      <ThemedText icon="location_on" type="paragraph">
        {formatTime(eventTime.startTime)} - {formatTime(eventTime.endTime)}
      </ThemedText>
      {isOpen ? <CalendarDropDown event={event} /> : <></>}
    </div>
  );
}
CalendarWidget.propTypes = {
  eventTime: PropTypes.Object,
};
