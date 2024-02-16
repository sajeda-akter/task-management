import { FloatingLabel } from "flowbite-react";
import { useContext, useRef } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import TitleSection from "../../../Hooks/TitleSection";

const Login = () => {
  const [errorUser,setErrorUser]=useState('')
  const emailRef=useRef(null)
  const { userLogin ,handleReset} = useContext(AuthContext);
  const navigate=useNavigate()
  const location=useLocation()


const handleLogin=(e)=>{
  e.preventDefault()
  const email=e.target.email.value;
  const password=e.target.password.value;
  userLogin(email,password)
  .then(result=>{
    console.log(result.user)
    navigate(location.state?location.state:'/')
   
    Swal.fire({
      position: "center",
      icon: "success",
      title: "user successfully login",
      showConfirmButton: false,
      timer: 1000,
    });
    e.target.email.value=""
    e.target.password.value=""
   
    // if(result.user.emailVerified){
    //   Swal.fire({
    //     position: "center",
    //     icon: "success",
    //     title: "user successfully login",
    //     showConfirmButton: false,
    //     timer: 1000,
    //   });
    //   e.target.email.value=""
    //   e.target.password.value=""
    // }
    // else{
    //   Swal.fire({
    //     position: "center",
    //     icon: "error",
    //     title: "Please verify your account.Check your inbox",
    //     showConfirmButton: false,
    //     timer: 2000,
    //   });
    //   e.target.email.value=""
    //   e.target.password.value=""
    // }
  })
  .catch(err=>{setErrorUser(err.message)})
}


const handleForgetPassword=()=>{
  const email=emailRef.current.value;
  if (!email) {
    console.log('pelase provide an email', emailRef.current.value)
    return;
}
else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    console.log('please write a valid email')
    return;
}

// verify password
handleReset(email)
.then(()=>{
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Reset your password",
    showConfirmButton: false,
    timer: 1000,
  });
})


}
  return (
    <div className="">
      <TitleSection pageName={'Fintask || Login'}/>
      <form
        onSubmit={handleLogin}
        className="lg:w-2/4 w-11/12 bg-[#D9EDBF] rounded-md p-12  mx-auto mt-32 shadow-xl"
      >
        <h1 className="border-b-4 border-[#508D69] text-[#4E9F3D] font-bold px-2 w-36 text-2xl mb-12 pb-2 mx-auto text-center ">
          Login{" "}
        </h1>

        <FloatingLabel
          name="email"
          type="text"
          ref={emailRef}
          variant="filled"
          label="Enter your email"
          color="success"
        />
 

        <FloatingLabel
         
          type="password"
          variant="filled"
          label="Enter your password"
          color="success"
          name='password'
        />
      

          <p className="text-red-600 font-medium">{errorUser}</p>
        <div className="flex justify-between">
        <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
        <p className="">
          Do you have a account?{" "}
          <span className="text-green-600 font-medium ml-2">
            <Link to="/signup">Signup</Link>
          </span>
        </p>
        </div>

        <div className="w-72 mx-auto my-8">
          <button className=" border-2 border-[#508D69] px-2 py-3 text-xl rounded-md w-72 hover:bg-[#508D69] hover:text-white hover:border-none">
            Login{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
