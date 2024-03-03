import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import usePublicAxiosSecure from "../../../Hooks/usePublicAxiosSecure";
import TitleSection from "../../../Hooks/TitleSection";

const UserTask = () => {
  const { user } = useContext(AuthContext);
  const publicSecure = usePublicAxiosSecure();
  const { data: userTask = [],refetch } = useQuery({
    queryKey: ["userTask"],
    queryFn: async () => {
      const res = await publicSecure(`/tasks?email=${user.email}`);
      return res.data;
    },
  });

  // update task complete or pending
  const handleUpdateTask = (task) => {

    publicSecure.patch(`/task/${task._id}`)
    .then((data)=>{
        if(data.data.modifiedCount>0){
            Swal.fire({
                title: "Updated!",
                text: "Update your task status.",
                icon: "success",
                timer: 1000,
              });
        }
        refetch()
    })


  };
  return (
    <div className="mt-10">
      <TitleSection pageName={'FinTask || My Task'}></TitleSection>
      <h1 className="border-y-2 border-[#508D69] text-[#4E9F3D] font-bold px-2 w-56 text-2xl mb-12 pb-2 mx-auto text-center ">
        My Task
      </h1>
      <div className="overflow-x-auto">
       {
        userTask== []? <> <Table striped>
        <Table.Head>
          <Table.HeadCell>Task</Table.HeadCell>
          <Table.HeadCell>Due Date</Table.HeadCell>
          <Table.HeadCell>Task info</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {userTask.map((task) => (
            <Table.Row
              key={task._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {task.task}
              </Table.Cell>
              <Table.Cell>{task.date}</Table.Cell>
              <Table.Cell>
                {task.taskAction === "pending" ? (
                  <button onClick={() => handleUpdateTask(task)}>
                    Pending
                  </button>
                ) : (
                  <p>Complete</p>
                )}
              </Table.Cell>
              <Table.Cell>
                <Link to={`/dashboard/taskdetails/${task._id}`}>Details</Link>{" "}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table></>:<p className="text-2xl text-center text-green-700 font-bold">There are no task</p>
       }
      </div>
    </div>
  );
};

export default UserTask;
