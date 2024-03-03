import { Table } from "flowbite-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
    const axiosSecure=useAxiosSecure()
    const { data: payments = [] } = useQuery({
      queryKey: ["payments"],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/payment`
        );
        return res.data;
      },
    });
    return (
        <div>
           <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Employee</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Salary</Table.HeadCell>
          <Table.HeadCell>
            Date
              </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {
                payments.map((payment,i)=>
                    <Table.Row key={payment._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
         
            <Table.Cell>{i+1}</Table.Cell>
            <Table.Cell>{payment.user}</Table.Cell>
            <Table.Cell>{payment.email}</Table.Cell>
            <Table.Cell>
             {payment.salary}
            </Table.Cell>
            <Table.Cell>
             {payment.date}
            </Table.Cell>
          </Table.Row>
                    
                    )
            }
          
      
        </Table.Body>
      </Table>
    </div>
        </div>
    );
};

export default PaymentHistory;