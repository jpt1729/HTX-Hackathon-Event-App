import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";
export default function Options({ title, options }) {
  return (
    <form id="checklistForm" className="flex gap-2">
      {options &&
        options.map((option, _i) => {
          return (
            <ThemedLabels key={_i} type='radio'>
              <ThemedInput type="radio" name={option} value={option}/>
              {option}
            </ThemedLabels>
          );
        })}
    </form>
  );
}
