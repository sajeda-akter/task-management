import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Navmenu = () => {
  const {user,logout}=useContext(AuthContext)

  const handleLogout=()=>{
    logout()
    .then(()=>{
      Swal.fire({
        position: "center",
        icon: "success",
        title: "user successfully logout",
        showConfirmButton: false,
        timer: 1000
      });
    })
  }
    return (
        <Navbar fluid  className="bg-[#0C2D57] h-16 text-white sticky top-0">
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
       {
        user &&  <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar alt="user" img={user.photoURL} className="border-2 border-white rounded-full" rounded />
        }
      >
        <Dropdown.Header>
   <span className="block text-sm">{user.displayName}</span>
          <span className="block truncate text-sm font-medium">{user.email}</span>
        </Dropdown.Header>
        <Dropdown.Item><button onClick={handleLogout}>Logout</button></Dropdown.Item>
       
      </Dropdown>
       }
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to='/'> Home</Link>
        
    <Link to='/login'>Login</Link>
        
        
        <Link to='/task'>Task</Link>
        <Link to='/dashboard'>Dashboard</Link>
    
      </Navbar.Collapse>
    </Navbar>
    );
};

export default Navmenu;