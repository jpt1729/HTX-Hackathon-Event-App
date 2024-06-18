import ThemedText from "@/components/ThemedText";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="p-5 flex justify-center items-center flex-col gap-5">
      <div className="max-w-screen-xl m-auto w-full">
        <ThemedText type="heading" className="!text-8xl">
          <span className="text-red-accent">Events</span> <br /> made easy
        </ThemedText>
        <div className="flex gap-2">
          <Link
            href="/events"
            className="py-2 px-4 mt-5 border leading-none bg-red-accent text-white rounded-full hover:border-red-accent hover:bg-white hover:text-red-accent font-semibold text-lg transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/events"
            className="py-2 px-4 mt-5 border leading-none border-black rounded-full hover:border-red-accent hover:text-red-accent text-lg transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="max-w-screen-xl m-auto w-full">
        <div className="flex gap-5">
          <div className="flex-1">
            <ThemedText type="heading">The Problem?</ThemedText>
            <ThemedText>
              At almost every event there is a strong lack of communication
              between organizers and participants and for good reason! There is
              not a way to spread information to the correct participants at the
              correct times besides word of mouth.
            </ThemedText>
          </div>
          <div className="flex-1">
            <ThemedText type="heading">The Solution?</ThemedText>
            <ThemedText>
              Easily invite participants to events. After participants get set
              up in the app, they can choose to get urgent information ASAP.
              Notifications can be sent out with a click. Q&A s can be done in a
              minute. Information can be updated instantly. And events start
              feeling more organized
            </ThemedText>
          </div>
        </div>
        <ThemedText type="heading">Who are we?</ThemedText>
        <ThemedText>
          We are a group of driven hackers who wanted to make a cool app so that
          events like yours could run smoother and more cleanly
        </ThemedText>
      </div>
    </main>
  );
}
