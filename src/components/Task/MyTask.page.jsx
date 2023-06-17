import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { allTasks } from "@/mock/tasks";
import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import Ticket from "@/components/Task/Ticket";

const MyTaskPage = () => {
  const CARDS = [
    {
      title: "New Tasks",
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
      <div className="mt-2 text-sm text-black dark:text-gray-50 ">
        <Droppable droppableId={status}>
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {filteredTasks.map((task, index) => (
                <Draggable
                  key={`${task.id}`}
                  draggableId={`${task.id}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="p-3 mt-2 mb-3 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Ticket task={task} />
                    </div>
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
        `${task.id}` === result.draggableId
    );

    if (task) {
      task.status = destinationStatus;
    }
  };

  return (
    <UserLayout>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="BOARD" type="COLUMN" direction="horizontal">
          {(provided) => (
            <div
              className="grid grid-cols-1 gap-12 p-4 text-black md:grid-cols-2 xl:grid-cols-3"
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
                      className="md:col-span-2 xl:col-span-1"
                    >
                      <div className="h-full p-3 text-black bg-white rounded">
                        <h3 className="text-sm font-semibold">{card.title}</h3>
                        <TaskItems status={card.status} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </UserLayout>
  );
};

export default MyTaskPage;
