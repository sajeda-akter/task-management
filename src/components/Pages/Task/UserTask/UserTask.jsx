import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import PublicAxiosSecure from "../../../Hooks/PublicAxiosSecure";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UserTask = () => {
  const { user } = useContext(AuthContext);
  const publicSecure = PublicAxiosSecure();
  const { data: userTask = [] } = useQuery({
    queryKey: ["userTask"],
    queryFn: async () => {
      const res = await publicSecure(`/tasks?email=${user.email}`);
      return res.data;
    },
  });

  // update task complete or pending
  const handleUpdateTask = (task) => {

    axios.patch(`http://localhost:5000/task/${task._id}`)
    .then((data)=>{
        if(data.data.modifiedCount>0){
            Swal.fire({
                title: "Updated!",
                text: "Update your task complete.",
                icon: "success",
                timer: 1000,
              });
        }
    })


  };
  return (
    <div>
      <div className="overflow-x-auto">
        <Table striped>
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
        </Table>
      </div>
    </div>
  );
};

export default UserTask;
