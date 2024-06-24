"use client";
import { createContext, useContext } from "react";

const EventContext = createContext();

export const EventProvider = ({ children, eventSlug }) => {
  const eventData = {};
  return (
    <EventContext.Provider
      value={{ eventData }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(ModalContext);
