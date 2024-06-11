import ThemedText from "@/components/ThemedText";
import URLComponent from "@/components/pages/layout/urlComponent";
import CustomMarkdown from "@/components/pages/markdown";
import QA from "@/components/pages/activity/qa";
import Options from "@/components/pages/activity/options";

const ActivityInfo = {
  title: "SWE Q&A Panel",
  content: [
    {
      id: "swe-qa-panel",
      type: "md", // different types of content. Markdown (md), Q&A, Polls
      title: "",
      content: "",
    },
  ],
};

export default function Page() {
  return (
    <main>
      <div>
        <ThemedText type="heading">{ActivityInfo.title}</ThemedText>
        <URLComponent />
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="flex flex-col gap-4 max-w-screen-md">
        <div>
          <CustomMarkdown
            source={`
          ## Welcome to our event

          We are so happy you are here. Before we can have some fun here is a checklist.
          - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor rhoncus dolor purus non enim. 
          - Massa ultricies mi quis hendrerit dolor magna eget est lorem. Enim ut tellus elementum sagittis vitae. Eu mi bibendum neque egestas congue. 
          - Vel facilisis volutpat est velit. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. In hac habitasse platea dictumst quisque sagittis. 
          - Facilisi morbi tempus iaculis urna id volutpat. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas.
        `}
          />
        </div>
        <QA
          title="Ask the engineers questions!"
          question="Write your question for the engineers!"
        />
        <form>
          <Options
            title="How many hours do you sleep?"
            options={["2-4 Hours", "6-8 Hours", "8-12 Hours"]}
          />
        </form>
      </div>
    </main>
  );
}
