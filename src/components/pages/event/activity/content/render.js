"use client";
import dynamic from "next/dynamic";
import { useOptimistic } from "react";

import EditBar from "./edit-bar";
import QA from "./qa";
import Options from "./options";

import CreateContentBar from "./create-content";

const CustomMarkdown = dynamic(() => import("@/components/pages/markdown"), {
  ssr: false,
});
export const Render = ({ activityData, admin }) => {
  const [content, addOptimisticChange] = useOptimistic(
    activityData.activitycontent,
    (state, update) => {
      const { id, action } = update;
      let newState = [...state];
      if (action === "delete") {
        newState = newState.filter((content) => content.id !== id);
        console.log(newState)
      }
      if (action === "increase") {
        const contentToUpdate = newState.find((obj) => obj.id === id);

        if (!contentToUpdate) {
          console.log(`Object with id ${id} not found`);
          return;
        }

        // Increase the order of the specified object by 1
        contentToUpdate.order += 1;

        // Find the object with the current order and decrease its order by 1
        const contentToDecrease = contentToUpdate.find(
          (obj) => obj.order === contentToUpdate.order
        );

        if (contentToDecrease) {
          contentToDecrease.order -= 1;
        }
      }
      return newState;
    }
  );
  return (
    <>
      {content &&
        content.map((contentPiece, _i) => {
          switch (contentPiece.type) {
            case "QA":
              return (
                <QA
                  index={_i}
                  contentLength={content.length}
                  addOptimisticChange={addOptimisticChange}
                  id={contentPiece.id}
                  key={contentPiece.id}
                  title={contentPiece.title}
                  question={contentPiece.content.question}
                  admin={admin}
                />
              );
            case "MC":
              return (
                <Options
                  index={_i}
                  contentLength={content.length}
                  addOptimisticChange={addOptimisticChange}
                  id={contentPiece.id}
                  key={contentPiece.id}
                  title={contentPiece.title}
                  options={contentPiece.content.options}
                  admin={admin}
                />
              );
            case "md":
              return (
                <div key={contentPiece.id} className="flex items-center gap-5">
                  {admin && (
                    <EditBar
                      key={contentPiece.id}
                      index={_i}
                      contentLength={content.length}
                      addOptimisticChange={addOptimisticChange}
                      id={contentPiece.id}
                    />
                  )}
                  <div>
                    <CustomMarkdown
                      key={contentPiece.id}
                      id={contentPiece.id}
                      source={contentPiece.content.markdown}
                    />
                  </div>
                </div>
              );
          }
        })}
      {admin && <CreateContentBar activityId={activityData.id} />}
    </>
  );
};
