import {  Navbar } from "flowbite-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Navmenu = () => {
  const { user, logout } = useContext(AuthContext);
  

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


  return (
    <Navbar
      fluid
      className="bg-[#0C2D57] z-30 h-16 text-red-200 sticky top-0"
    >
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          className="w-12 h-12 rounded-lg me-2"
          src="https://media.istockphoto.com/id/1340927010/vector/f-letter-initial-luxurious-logo-template-f-logo-golden-concept-f-letter-logo-with-golden.jpg?s=612x612&w=0&k=20&c=VG50L6YpIYUzXxLP5bSuGYRz2i3hJLHPFCuxtiRmdUM="
          alt=""
        />
        <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">
          Fin<span className="">Task</span>
        </span>
      </Navbar.Brand>

      <Navbar.Collapse
        className="bg-slate-200 lg:bg-[#0C2D57]  text-[#0C2D57] shadow-xl lg:text-white w-40 p-5 lg:p-0  fixed top-16 lg:top-5 right-0 lg:right-1/4 "
        id="navmenu"
      >
        <Link to="/"> Home</Link>
        <Link to="/dashboard">Dashboard</Link>


        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}

      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navmenu;
