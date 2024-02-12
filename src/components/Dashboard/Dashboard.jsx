import { Sidebar } from "flowbite-react";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAdmin from "../Hooks/UseAdmin/useAdmin";

const Dashboard = () => {
  const { user }= useContext(AuthContext);
  const isAdmin = useAdmin();

  return (
    <div className="flex bg-slate-200 min-h-screen">
      <Sidebar className=" me-24 w-72 sticky top-0">
        <Sidebar.Items className="">
          <Sidebar.ItemGroup>
            {user && (
              <Sidebar.Item>
                <Link to="/dashboard/mytask"> Task </Link>
              </Sidebar.Item>
            )}

            {isAdmin && (
              <Sidebar.Item>
                <Link to="/dashboard/task"> Add Task </Link>
              </Sidebar.Item>
            )}

            <Sidebar.Item>
              <Link to="/dashboard/alltask"> All Task </Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="w-full bg-slate-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
