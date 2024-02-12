import { Table } from "flowbite-react";
import PublicAxiosSecure from "../../../Hooks/PublicAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


const AllTask = () => {
    const publicSecure=PublicAxiosSecure()

    const {data:tasks=[]}=useQuery({
        queryKey:['tasks'],
        queryFn:async()=>{
           const res=await publicSecure('/task')
            return (res.data)
        }
    })
   
  
    return (
       <div>
            <div className="overflow-x-auto">
            <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Sl No</Table.HeadCell>
          <Table.HeadCell>Assign User</Table.HeadCell>
          <Table.HeadCell>Task</Table.HeadCell>
          <Table.HeadCell>Schedule</Table.HeadCell>
          <Table.HeadCell>Task Action</Table.HeadCell>
          
        </Table.Head>
        <Table.Body className="divide-y">
       
          {
            tasks.map((task,i)=> <Table.Row key={task._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
           
           <Table.Cell>{i+1}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {task.user}
            </Table.Cell>
            <Table.Cell>{task.task}</Table.Cell>
            <Table.Cell>{task.date}</Table.Cell>
            <Table.Cell><p>{task.taskAction =='pending'? 'pending':'completed'}</p></Table.Cell>
          </Table.Row>)
          }
         
          
        </Table.Body>
      </Table>
    </div>
    </div>
       </div>
        
    );
};

export default AllTask;