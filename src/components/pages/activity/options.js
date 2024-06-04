import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";
/**
 * This component renders an options Prompt
 *
 * @param {Object} props - Component properties
 * @param {string} [props.id] id of the options
 * @param {string} [props.title] title of the options
 * @param {string[]} [props.options] question of the options
 * @returns {React.ReactNode} A React element that renders an options prompt
 */
export default function Options({ id, title, options }) {
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
QA.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  question: PropTypes.string
};
