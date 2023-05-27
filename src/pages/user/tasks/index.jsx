import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { allTasks } from "@/mock/tasks";
import UserLayout from "@/components/layouts/UserLayout/UserLayout";

const Tasks = () => {
  const CARDS = [
    {
      title: "TODOs",
      status: "todo",
    },
    {
      title: "In Progress",
      status: "inprogress",
    },
    {
      title: "Done",
      status: "done",
    },
  ];

  const TaskItems = ({ status }) => {
    // Filter tasks based on the status prop
    const filteredTasks = allTasks.filter(
      (task) => task.status.toLowerCase() === status
    );

    return (
      <div>
        <h2>Tasks with status: {status}</h2>
        <Droppable droppableId={status}>
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {filteredTasks.map((task, index) => (
                <Draggable
                  key={`${task.name}-${task.status}`}
                  draggableId={`${task.name}-${task.status}`}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <h3>{task.name}</h3>
                      <p>Assigned To: {task.assignedTo}</p>
                      <p>Detail: {task.detail}</p>
                      <p>Issue Date: {task.issueDate}</p>
                      <p>Due Date: {task.dueDate}</p>
                      <p>Priority: {task.priority}</p>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    );
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    // If the destination is null or the task is dropped back to the original position, do nothing
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const sourceStatus = CARDS[source.index].status;
    const destinationStatus = CARDS[destination.index].status;

    const task = allTasks.find(
      (task) =>
        task.status.toLowerCase() === sourceStatus &&
        `${task.name}-${task.status}` === result.draggableId
    );

    if (task) {
      task.status = destinationStatus;
    }
  };

  return (
    <UserLayout>
      <div className="w-full h-full">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="BOARD" type="COLUMN" direction="horizontal">
            {(provided) => (
              <div
                className="flex w-full h-full gap-4 bg-red-100"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {CARDS.map((card, index) => (
                  <Draggable
                    key={card.status}
                    draggableId={card.status}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`w-[${100 / CARDS.length}%] bg-white border`}
                      >
                        <h3 className="text-2xl">{card.title}</h3>
                        <TaskItems status={card.status} />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </UserLayout>
  );
};

export default Tasks;
