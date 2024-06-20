"use client";
import ThemedText from "@/components/ThemedText";
import Link from "next/link";
import { motion } from "framer-motion";

const EventTypes = [
  "Events",
  "Hackathons",
  "Conferences",
  "Meetings",
  "Parties",
]; //Todo: Make events cycle throught this list!

export default function Home() {
  return (
    <>
      <main className="p-5 flex justify-center items-center flex-col gap-5">
        <div className="max-w-screen-xl m-auto w-full h-screen">
          <div className="text-8xl">
            <motion.h1
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.375 }}
              className="text-red-accent text-8xl"
            >
              Events
            </motion.h1>

            <motion.h1
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.375, delay: 0.25 }}
              className="text-8xl"
            >
              made easy
            </motion.h1>
          </div>
          <div className="flex gap-2 mt-5">
            <Link href="/events">
              <motion.p
                initial={{ x: -12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.325 }}
                className="py-2 px-4 border leading-none bg-red-accent text-white rounded-full hover:border-red-accent hover:bg-white hover:text-red-accent font-semibold text-lg transition-colors"
              >
                Get Started
              </motion.p>
            </Link>
            <Link href="/events">
              <motion.p
                initial={{ x: 12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.325 }}
                className="py-2 px-4 border leading-none border-black rounded-full hover:border-red-accent hover:text-red-accent text-lg transition-colors"
              >
                Learn More
              </motion.p>
            </Link>
          </div>
        </div>
        <div className="max-w-screen-xl m-auto w-full">
          <div className="grid grid-cols-2 grid-rows-2 gap-5 w-full h-full">
            <div className="bg-black border-lg w-full h-full"></div>
            <div className="bg-black border-lg w-full h-full"></div>
            <div className="bg-black border-lg w-full h-full"></div>
            <div className="bg-black border-lg w-full h-full"></div>
          </div>
        </div>
        <div className="max-w-screen-xl m-auto w-full">
          <div className="flex gap-5 mb-5">
            <motion.div
              initial={{ x: -25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.5 }}
              className="flex-1 bg-white shadow rounded-lg p-5"
            >
              <ThemedText type="subheading">The Problem?</ThemedText>
              <ThemedText>
                At almost every event there is a strong lack of communication
                between organizers and participants and for good reason! There
                is not a way to spread information to the correct participants
                at the correct times besides word of mouth.
              </ThemedText>
            </motion.div>
            <motion.div
              initial={{ x: 25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.5 }}
              className="flex-1 bg-white shadow rounded-lg p-5"
            >
              <ThemedText type="subheading">The Solution?</ThemedText>
              <ThemedText>
                Easily invite participants to events. After participants get set
                up in the app, they can choose to get urgent information ASAP.
                Notifications can be sent out with a click. Q&A s can be done in
                a minute. Information can be updated instantly. And events start
                feeling more organized
              </ThemedText>
            </motion.div>
          </div>
          <ThemedText className="px-5" type="heading">
            Who are we?
          </ThemedText>
          <ThemedText className="px-5">
            We are a group of driven hackers who wanted to make a cool app so
            that events like yours could run smoother and more cleanly. We want
            to streamline your event process making those little changes not
            seem so big in the heat of the moment
          </ThemedText>
        </div>
      </main>
      <footer className="max-w-screen-xl w-full m-auto">
        <div>Event App</div>
        <div className="flex justify-between w-full">
          <Link href="/" className="underline text-gray">
            Home
          </Link>
          <Link href="/" className="underline text-gray">
            About Us
          </Link>
          <Link href="/" className="underline text-gray">
            Events
          </Link>
          <Link href="/" className="underline text-gray">
            Pricing
          </Link>
          <Link href="/" className="underline text-gray">
            Terms of Service
          </Link>
          <Link href="/" className="underline text-gray">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </>
  );
}
