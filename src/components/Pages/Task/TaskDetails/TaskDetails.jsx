import { useLoaderData } from "react-router-dom";
import { Card } from "flowbite-react";
import TitleSection from "../../../Hooks/TitleSection";

const TaskDetails = () => {
  const task = useLoaderData();

  return (
    <div>
      <TitleSection pageName={"Fintask || Task Details"} />

    <p className="border-y-2 border-[#1B1A55] w-72 font-bold text-red-400 mt-10 text-center text-3xl p-2 mx-auto">Task Details</p>
      <Card className="max-w-lg mt-5 mx-auto text-white bg-[#1B1A55] lg:mt-12" horizontal>
        <h5 className="text-2xl font-bold tracking-tight ">
          <span className=" font-medium text-red-300">Task: </span> {task.task}
        </h5>
        <p className="font-normal ">
          <span className="text-xl font-medium text-red-300"> Details: </span>{" "}
          {task.description}
        </p>
        <p>
          <span className="text-xl font-medium text-red-300">Date: </span>{" "}
          {task.date}
        </p>
        <div className="flex justify-between">
          <p>
            <span className="text-xl font-medium text-red-300">Priority: </span>{" "}
            {task.priority}
          </p>
          <p>
            <span className="text-xl font-medium text-red-300">
              Task Status:{" "}
            </span>{" "}
            {task.taskAction}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default TaskDetails;
