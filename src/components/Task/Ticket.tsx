import React from "react";
import { useState } from "react";

const Ticket = ({ task }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold capitalize">{task.name}</h3>
        <span className="rounded-lg bg-secondary px-2 text-sm font-semibold">
          {task.priority}
        </span>
      </div>
      <p className="text-xs">Due Date: {task.dueDate}</p>
      {task.detail.length > 100 ? (
        showDetail ? (
          <p className="">
            {task.detail}{" "}
            <button
              className="text-primary underline"
              onClick={() => setShowDetail(false)}
            >
              Read Less
            </button>
          </p>
        ) : (
          <p className="">
            {task.detail.substring(0, 100)}...
            <button
              className="text-primary underline"
              onClick={() => setShowDetail(true)}
            >
              Read More
            </button>
          </p>
        )
      ) : (
        <p>{task.detail}</p>
      )}
    </div>
  );
};

export default Ticket;
