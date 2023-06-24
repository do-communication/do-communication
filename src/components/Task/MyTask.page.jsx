import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import Ticket from "@/components/Task/Ticket";
import { collection, getDocs, getDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../context/DbContext";
import { auth } from "../../../config/firebase";
const user = auth.currentUser;
const MyTaskPage = () => {
  const [allTasks, setallTasks] = useState([]);
  const [tasks, setTasks] = useState([allTasks]);
  console.log("mytask loaded")
  const getData = async () => {

    const all = collection(db, "KalCompany", "Tasks", "Tasks");
    try {

      const unsubscribe = onSnapshot(all, (querySnapshot) => {
        let arr = []
        let temp = []
        querySnapshot.forEach((doc) => {
          arr.push({ id: doc.id, data: doc.data() });
        });
 
        arr.map(a => {
          if (a.data.AssignedTo.includes(user.uid)) {
            temp.push(a)
          }
        })

        setTasks(temp)
        setallTasks(temp)
      });
    } catch (err) {
      console.log(err)
      setTasks([{ Name: "check your connection" }])
    }


    // const doc = await getDocs(all)
    // doc.forEach(d => {
    //   arr.push({id:d.id, data:d.data()})
    // });

    //   arr.map(a => {
    //     if(a.data.AssignedTo.includes(user.displayName)){
    //       temp.push(a)
    //     }
    //   })
    // } catch (err) {
    //   console.log(err)
    //   setTasks([{ Name: "check your connection" }])
    // }

    // setTasks(temp)
    // setallTasks(temp)
  }
  const CARDS = [
    {
      title: "New Tasks",
      status: "assigned",
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
      (task) => task.data.Status.toLowerCase() === status
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
                      className="mb-3 mt-2 cursor-pointer rounded border-b border-gray-100 bg-white p-3 hover:bg-gray-50 dark:border-gray-900 dark:bg-gray-600 dark:hover:bg-gray-700"
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
  useEffect(() => {
    getData();
  }, []);
  const handleDragEnd = (result) => {
    const { destination, source } = result;
    console.log(result)
    // If the destination is null or the task is dropped back to the original position, do nothing
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;
    console.log(sourceStatus)
    console.log(destinationStatus)

    const task = allTasks.find(
      (task) =>
        task.data.Status.toLowerCase() === sourceStatus &&
        `${task.id}` === result.draggableId
    );

    if (task) {
      change(task, destinationStatus, sourceStatus);
    }
  };
  const change = async (task, destinationStatus, sourceStatus) => {
    const docRef = doc(db, "KalCompany", "Tasks", "Tasks", task.id);
    const mem = await getDoc(docRef)
    let tempAssigned = []
    const assigned = mem._document.data.value.mapValue.fields.AssignedTo.arrayValue.values
    if (assigned) {
      assigned.forEach(t => {
        if (t) {
          tempAssigned.push(t.stringValue);
        }
      });
    }
    const newData = {
      Title: mem._document.data.value.mapValue.fields.Title.stringValue,
      Priority: mem._document.data.value.mapValue.fields.Priority.stringValue,
      AssignedBy: mem._document.data.value.mapValue.fields.AssignedBy.stringValue,
      Description: mem._document.data.value.mapValue.fields.Description.stringValue,
      Status: destinationStatus,
      AssignedTo: tempAssigned,
      StartDate: mem._document.data.value.mapValue.fields.StartDate.stringValue,
      DueDate: mem._document.data.value.mapValue.fields.DueDate.stringValue,
    }
    updateDoc(docRef, newData)
      .then(docRef => {
        console.log("A New Document Field has been added to an existing document");
      })
      .catch(error => {
        console.log(error);
      })

  }
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
                      <div className="h-full rounded bg-white p-3 text-black">
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
