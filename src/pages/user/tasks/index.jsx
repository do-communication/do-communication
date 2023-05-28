import dynamic from "next/dynamic";
const MyTaskClientOnly = dynamic(
  () => import("@/components/Task/MyTask.page"),
  {
    ssr: false, // Ensure that the Ticket component is not included in server-side rendering
  }
);

const Task = () => {
  return <MyTaskClientOnly />;
};

export default Task;
