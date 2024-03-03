import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Employees = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const employees = users.filter((em) => em.role !== "admin");

  return (
    <div className="w-11/12 mx-auto mt-12">
      <h1 className="border-y-2 border-[#508D69] text-[#4E9F3D] font-bold px-2 w-56 text-2xl mb-12 pb-2 mx-auto text-center ">
        All Employee
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 ">
        {employees.map((employee) => (
          <div key={employee._id} className="h-96 p-2 rounded-md  border-2 border-[#4E9F3D] max-w-sm ml-12 lg:ml-0 bg-slate-200 hover:shadow-2xl text-[#0C2D57]">
            <img className="h-52 w-full rounded-sm" src={employee.photoURL} alt="" />
            <p className="font-bold text-xl my-4">{employee.user}</p>
            <p className="font-medium">{employee.email}</p>
            <p className="border-2 border-[#4E9F3D] w-52 p-1 text-center rounded-md mx-auto mt-8"><Link to={`/dashboard/payment/${employee._id}`}>Payment</Link></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
