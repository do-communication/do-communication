import React from "react";
import { useState } from "react";

const Ticket = ({ task }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold capitalize">{task.data.Title}</h3>
        <span className="px-2 text-sm font-semibold rounded-lg bg-secondary">
          {task.data.Priority}
        </span>
      </div>
      <p className="text-xs">Due Date: {task.data.DueDate}</p>
      {task.data.Description.length > 100 ? (
        showDetail ? (
          <p className="">
            {task.data.Description}{" "}
            <button
              className="text-primary underline"
              onClick={() => setShowDetail(false)}
            >
              Read Less
            </button>
          </p>
        ) : (
          <p className="">
            {task.data.Description.substring(0, 100)}...
            <button
              className="text-primary underline"
              onClick={() => setShowDetail(true)}
            >
              Read More
            </button>
          </p>
        )
      ) : (
        <p>{task.data.Description}</p>
      )}
    </div>
  );
};

export default Ticket;
