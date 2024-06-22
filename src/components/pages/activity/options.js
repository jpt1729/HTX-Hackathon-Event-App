"use client";
import { useFormState } from "react-dom";

import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";
import PropTypes from "prop-types";

import { OptionsAction } from "./action";
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
  const [state, formAction] = useFormState(OptionsAction, {
    status: "",
    message: "",
  });
  return (
    <form className="border-t-1 border-gray" action={formAction}>
      <ThemedLabels type="paragraph" className="font-bold" htmlFor={title}>
        {title}
      </ThemedLabels>
      <br />
      <div>
        <div className="flex gap-2">
          {options &&
            options.map((option, _i) => {
              return (
                <>
                  <ThemedInput
                    key={_i + "radio"}
                    type="radio"
                    name={"option"}
                    id={option.replaceAll(" ", "")}
                    value={option}
                  />
                  <ThemedLabels
                    key={_i + "radio-label"}
                    type="radio"
                    htmlFor={option.replaceAll(" ", "")}
                  >
                    {option}
                  </ThemedLabels>
                </>
              );
            })}
        </div>
        {state.status === "error" && (
          <ThemedLabels type="subtext" className="text-warning">
            {state.message}
          </ThemedLabels>
        )}
      </div>
      <ThemedInput type="submit" value="Submit" />
      <input type="text" name="id" className="hidden" value={id} readOnly />
    </form>
  );
}
Options.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  question: PropTypes.string,
};
