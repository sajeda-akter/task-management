import { Card, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import TitleSection from "../../../Hooks/TitleSection";
import moment from "moment";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {  HiTrash } from "react-icons/hi";
import Swal from "sweetalert2";

const AllTask = () => {

  const axiosSecure=useAxiosSecure()
  const [tasks, setTasks] = useState([]);
 const [priorityTask, setPriorityTask] = useState([]);

  // sorting by date
  const [asc, setAsc] = useState(true);
  const fetchData = async () => {
    try {
      
      const res = await axiosSecure.get(`/task?sort=${asc ? "asc" : "desc"}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Call fetchData when the component mounts
    fetchData();
  }, []);

  

// Get the current date and time as a reference
const referenceDate = moment(new Date());

let overDueTask=[]
// Iterate through the tasks array
tasks.forEach(task => {
  // Parse the date using Moment.js
  const taskDate = moment(task.date, 'MMMM Do');
  // Compare the parsed date with the reference date
  const isSameOrAfter = taskDate.isSameOrAfter(referenceDate,'day');
  if(!isSameOrAfter){
overDueTask.push(task)

  }

});
  
// task status
  const pendingTask = tasks.filter((task) => task.taskAction == "pending");
  const completeTask = tasks.filter((task) => task.taskAction == "complete");
  const hanldeStatus=(e)=>{
    e.preventDefault()
    const taskStatus=e.target.value

    if(taskStatus)
  if(taskStatus ==='Complete'){
      setPriorityTask(completeTask)
  }
  else if(taskStatus==='Pending'){
    setPriorityTask(pendingTask)
  }
 if(taskStatus ==='OverDue'){
  setPriorityTask(overDueTask)
 }
  }

  const hanldeFilter = (e) => {
    e.preventDefault();
   
    const priority = e.target.value;
    if (priority ==='All') {
      setPriorityTask(tasks);
    } else {
      const mediumPriority = tasks.filter((task) => task.priority === priority);
      setPriorityTask(mediumPriority);
    }
  };


  // delete user assign task
const handleDelete=(_id)=>{
  axiosSecure.delete(`/task/${_id}`)
  .then(res=>{
   if(res.data.deletedCount>0){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Successfully deleted task",
      showConfirmButton: false,
      timer: 1000,
    });
    console.log("Fetching data after deletion...");
 
   

  }
  })
}



  return (
    <div>
      <TitleSection pageName={"Fintask || AllTask"} />
      <div className="flex flex-col lg:flex-row gap-12 items-center mt-10">
        <button
          className="border-2 border-[#4E9F3D] h-10 w-40 p-1 rounded-md"
          onClick={() => setAsc(!asc)}
        >
          {asc ? " asc to desc by date" : "desc to asc by date "}
        </button>

        <form action="" className="flex lg:flex-row flex-col lg:gap-10">
          <div className="my-4 flex items-center ">
            <p className="me-4 text-[16px] font-medium">Task Priority</p>
            <Select
              className="text-red-900"
              name="priority"
              value={""}
              onChange={hanldeFilter}
            >
              <option disabled value="">
                Select task priority
              </option>
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
          </div>
          <div className="my-4 flex items-center ">
            <p className="me-4 text-[16px] font-medium">Task Status</p>
            <Select
              className="text-red-900 ml-2"
              name="status"
              value={""}
              onChange={hanldeStatus}
            >
              <option disabled value="">
                Select task status
              </option>
              <option value="Complete">Complete</option>
              <option value="Pending">Pending</option>
              <option value="OverDue">OverDue</option>
            </Select>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
   
      {priorityTask.map((task) => (
          <Card
            key={task._id}
            className="bg-slate-200 hover:shadow-lg lg:max-w-md mt-4 md:max-w-md max-w-md ml-7 lg:ml-0 lg:mr-5"
          >
            <div className="flex flex-col  pb-10 relative">

            <button onClick={()=>handleDelete(task._id)} className="text-2xl text-red-600 absolute right-0" title="delete"><HiTrash/></button>

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

              <span className="font-bold">
                Assaign User: <span className="font-normal">{task.user}</span>
              </span>
              <span className="font-medium">
                Email: <span>{task.email}</span>
              </span>
             
             
             
            </div>
             
            
          </Card>
        ))}

   
      </div>
    </div>
  );
};

export default AllTask;
