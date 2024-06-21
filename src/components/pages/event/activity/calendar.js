"use client";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function CustomCalendar({ activities }) {
  return (
    <div className='h-full'>
      <Calendar
        localizer={localizer}
        events={activities}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
