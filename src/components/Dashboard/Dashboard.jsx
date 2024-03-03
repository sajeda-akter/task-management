import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAdmin from "../Hooks/UseAdmin/useAdmin";

import {

  HiHome,
  HiLogout,
  HiMenu,
  HiOutlinePencilAlt,
  HiShoppingBag,
  HiUser,
  HiUserGroup,
} from "react-icons/hi";

import {  Dropdown, Navbar, Sidebar } from "flowbite-react";
import { Link, Outlet } from "react-router-dom";
import useUser from "../Hooks/useUser";
import Swal from "sweetalert2";

const Dashboard = () => {
  const {  logout } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const users = useUser();

  const handleLogout = () => {
    logout().then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "user successfully logout",
        showConfirmButton: false,
        timer: 1000,
      });
    });
  };

  const assignUser = users[0][0];

  return (
    <div className=" flex lg:flex-row flex-col justify-between">
      <div className=" sticky z-30 top-0 ">
        {/* sidebar for large device */}
        <Sidebar
          className=" min-h-screen bg-[#0C2D57] hidden lg:block "
          aria-label="Sidebar with multi-level dropdown example"
          style={{ position: 'fixed' }}
        >
          <div className="flex items-center gap-4 mb-8">
            <img
              className="border-2 border-purple-900  w-16 h-16 rounded-full"
              src={assignUser?.photoURL}
              alt=""
            />
            <p className="text-2xl font-bold ">{assignUser?.user}</p>
          </div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HiHome}>
                <Link to="/"> Home</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiUser}>
                <Link to="/dashboard/profile"> Users Profile</Link>
              </Sidebar.Item>

              
              {isAdmin.admin ===true ? (
                <>
                  <Sidebar.Item icon={HiShoppingBag}>
                    <Link to="/dashboard/alltask">All Task</Link>
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiOutlinePencilAlt}>
                    <Link to="/dashboard/task">Add Task</Link>
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiUserGroup}>
                    <Link to="/dashboard/employee">All Employee</Link>
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiUserGroup}>
                    <Link to="/dashboard/paymentHistory">Payment History</Link>
                  </Sidebar.Item>
                  
                </>
              
              )
            :   <Sidebar.Item icon={HiShoppingBag}>
            <Link to="/dashboard/mytask"> My Task</Link>
          </Sidebar.Item>
            }
           
                  <Sidebar.Item icon={HiLogout}>
                    <button onClick={handleLogout}>Logout</button>
                  </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>

        {/* navbar for small device */}
        <Navbar fluid className="lg:hidden bg-[#0C2D57] text-white sticky top-0">
          <Navbar.Brand>
            <img
              src={assignUser?.photoURL}
              className="w-16 h-16 rounded-full"
              alt=""
            />
            <p className="ml-3 text-2xl font-bold">{assignUser?.user}</p>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={<HiMenu className="text-3xl" />}
              className="w-52 mt-5"
            >
               <Dropdown.Item icon={HiUser}>
                    <Link to="/dashboard/profile">User Profile</Link>
                  </Dropdown.Item>
              <Dropdown.Item  icon={HiHome}>
                <Link to="/">Home</Link>
              </Dropdown.Item>

              {isAdmin.admin ===true ?(
                <>
                  <Dropdown.Item  icon={HiUser}>
                    <Link to="/dashboard/alltask">All Task</Link>
                  </Dropdown.Item>
                  <Dropdown.Item icon={HiOutlinePencilAlt}>
                    <Link to="/dashboard/task">Task Create</Link>
                  </Dropdown.Item>
                  <Dropdown.Item icon={HiUserGroup}>
                    <Link to="/dashboard/employee">All Employee</Link>
                  </Dropdown.Item>
                  <Dropdown.Item icon={HiUserGroup}>
                    <Link to="/dashboard/paymentHistry">Payment History</Link>
                  </Dropdown.Item>
                 
                </>):
                   <Dropdown.Item icon={HiShoppingBag}>
                   <Link to="/dashboard/mytask">My Task</Link>
                 </Dropdown.Item>
                
                }
            
               <Dropdown.Item icon={HiLogout}>
                    <button onClick={handleLogout}>Logout</button>
                  </Dropdown.Item>
            </Dropdown>
          </div>
        </Navbar>
      </div>
      <div className="lg:w-3/4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
