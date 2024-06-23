"use client";
import ThemedText from "@/components/ThemedText";

export default function Error({ error, reset }) {
  console.log(error);
  return (
    <div>
      <ThemedText type="heading">Uh oh something went very wrong!</ThemedText>
      <ThemedText>Luckly we got this magic button to fix it!</ThemedText>
      <button
        name="Reset Webpage"
        onClick={() => {
          reset();
        }}
        className="border border-black rounded px-5 py-1 hover:border-red-accent transition-colors"
      >
        Magic Button
      </button>
    </div>
  );
}
