import { FileInput, FloatingLabel } from "flowbite-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import PublicAxiosSecure from "../../Hooks/PublicAxiosSecure";
import TitleSection from "../../../Hooks/TitleSection";

const Signup = () => {
  const publicSecure = PublicAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser } = useContext(AuthContext);
  const handleSignup = async (data) => {
    const imgFile = { image: data.photo[0] };
    const imaageHosting = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_REACT_IMGBB_KEY
    }`;

    const res = await axios.post(imaageHosting, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      createUser(data.email, data.password).then((result) => {
        const photoURL = res.data.data.display_url;

        updateUser(data.name, photoURL)
        .then(() => {
       
             const userInfo = {
            user: data.name,
            email: data.email,
            role: "employee",
            photoURL,
          };

          publicSecure.post('/users',userInfo)
          .then(()=>{
            Swal.fire({
              position: "center",
              icon: "success",
              title: "user successfully signup",
              showConfirmButton: false,
              timer: 1000,
            });
          })
       
          reset()

          
        });
      });
    }
  };
  return (
    <div className="">
      <TitleSection pageName={"Fintask || Signup"} />

      <form
        onSubmit={handleSubmit(handleSignup)}
        className="lg:w-2/4 w-11/12 bg-[#D9EDBF] rounded-md p-12  mx-auto mt-32 shadow-xl"
      >
        <h1 className="border-b-4 border-[#508D69] text-[#4E9F3D] font-bold px-2 w-36 text-2xl mb-12 pb-2 mx-auto text-center ">
          Signup
        </h1>
        <FloatingLabel
          {...register("name", { required: true })}
          type="text"
          variant="filled"
          label="Enter your name"
          color="success"
        />
        {errors.name && (
          <p className="text-red-700 my-1 font-medium">Name is required</p>
        )}

        <FloatingLabel
          {...register("email")}
          type="text"
          variant="filled"
          label="Enter your email"
          color="success"
        />
        {errors.email && (
          <p className="text-red-700 my-1 font-medium">Email must be need</p>
        )}

        <FloatingLabel
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 20,
            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
          })}
          type="password"
          variant="filled"
          label="Enter your password"
          color="success"
        />
        {errors.password?.type === "required" && (
          <p className="text-red-600">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-600">Password must be 6 characters</p>
        )}
        {errors.password?.type === "maxLength" && (
          <p className="text-red-600">
            Password must be less than 20 characters
          </p>
        )}
        {errors.password?.type === "pattern" && (
          <p className="text-red-600">
            Password must have one Uppercase one lower case, one number and one
            special character.
          </p>
        )}

        <FileInput
          id="file-upload-helper-text"
          {...register("photo", { required: true })}
          type="file"
        />
        {errors.photo && (
          <p className="text-red-700 my-1 font-medium">Please upload a photo</p>
        )}
        <p className="mt-4">
          Already have a account?{" "}
          <span className="text-green-600 font-medium ml-5">
            <Link to="/login">Login</Link>
          </span>
        </p>

        <div className="w-72 mx-auto my-8">
          <button className=" border-2 border-[#508D69] px-2 py-3 text-xl rounded-md w-72 hover:bg-[#508D69] hover:text-white hover:border-none">
            Signup{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
