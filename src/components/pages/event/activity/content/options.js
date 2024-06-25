"use client";
import { useRef } from "react";
import { useFormState } from "react-dom";

import EditBar from "./edit-bar";
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
export default function Options({
  id,
  title,
  options,
  admin,
  index,
  contentLength,
}) {
  const [state, formAction] = useFormState(OptionsAction, {
    status: "",
    message: "",
  });
  const ref = useRef();
  return (
    <div className="flex gap-5 items-center w-full">
      {admin && <EditBar id={id} index={index} contentLength={contentLength} />}

      <form
        className="border-t-1 border-gray flex items-center gap-5 w-full"
        ref={ref}
        action={async (formData) => {
          await formAction(formData);
          ref?.current?.reset();
        }}
      >
        <div className="">
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
          <br />
        </div>
      </form>
    </div>
  );
}
Options.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  question: PropTypes.string,
};
