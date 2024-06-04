import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";
export default function Options({ title, options }) {
  return (
    <>
      <ThemedLabels type="paragraph" className="font-bold" htmlFor={title}>
        {title}
      </ThemedLabels>
      <br />
      <div className="flex gap-2">
        {options &&
          options.map((option, _i) => {
            return (
              <>
                <ThemedInput
                  key={_i + 'radio'}
                  type="radio"
                  name={title}
                  id={option.replaceAll(" ", "")}
                  value={option}
                />
                <ThemedLabels
                  key={_i + 'radio-label'}
                  type="radio"
                  htmlFor={option.replaceAll(" ", "")}
                >
                  {option}
                </ThemedLabels>
              </>
            );
          })}
      </div>
    </>
  );
}
