import { Card, Select } from "flowbite-react";
import PublicAxiosSecure from "../../../Hooks/PublicAxiosSecure";
import TitleSection from "../../../../Hooks/TitleSection";
import { useEffect, useState } from "react";

const AllTask = () => {
  const publicSecure = PublicAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const [priorityTask,setPriorityTask]=useState([])
  const [asc, setAsc] = useState(true);
  useEffect(() => {
    publicSecure(`/task?sort=${asc ? "asc" : "desc"}`).then((res) => {
      setTasks(res.data);
    });
  }, [asc, publicSecure]);



  const hanldeFilter=(e)=>{
    e.preventDefault()
    const priority=e.target.value
    const mediumPriority=tasks.filter(task=>task.priority === priority)
    if(mediumPriority){
     return setTasks(mediumPriority)

    }
    else{
      return setTasks(tasks)
    }
    

  }
  return (
    <div>
      <TitleSection pageName={"Fintask || AllTask"} />
      <button onClick={() => setAsc(!asc)}>
        {asc ? "date to high to low" : "low to high"}
      </button>


    <form action="" >
    <div className="my-4 flex items-center ">
          <p className="me-4 text-[16px] font-medium">Task Priority</p>
          <Select name="priority" onChange={hanldeFilter}>
            <option disabled selected>
              Select task priority
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </div>
    </form>
      <div>
        {tasks.map((task) => (
          <Card key={task._id} className="max-w-md mt-4">
            <div className="flex flex-col items-center pb-10">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                <span className="font-bold">Task: </span> {task.task}
              </h5>
              <span>
                <span className="font-bold">Date: </span> {task.date}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-sm ">
                  <span className="font-bold">Priority: </span> {task.priority}
                </span>
                <span>
                  <span className="font-bold">Task Status: </span>{" "}
                  {task.taskAction}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
