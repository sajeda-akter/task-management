import { Button, FileInput, Label, TextInput } from "flowbite-react";
import TitleSection from "../../../Hooks/TitleSection";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PublicAxiosSecure from "../../Hooks/PublicAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useUser from "../../Hooks/useUser";

const ProfileSetting = () => {
  const { register, handleSubmit, reset } = useForm();
const users=useUser()

  // update user info
  const userId = users[0]?._id;
  const handleUpdateUser = async (data) => {
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
      const photoURL = res.data.data.display_url;
      const userInfo = {
        user: data.user,
        photoURL,
      };
      axios
        .patch(`http://localhost:5000/users/${userId}`, userInfo)
        .then((data) => {
          if (data.data.modifiedCount > 0) {
            Swal.fire({
              title: "Updated!",
              text: "Update your Information.",
              icon: "success",
              timer: 1000,
            });
          }
          reset();
        });
    }
  };
  return (
    <div>
      <TitleSection pageName={"FinTask || Profile Setting"}></TitleSection>

      <p className="text-2xl font-bold  text-center my-5 border-y-2 border-slate-400 w-72 mx-auto p-2">
        Update Your Info
      </p>
      {users.map((employee) => (
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          key={employee._id}
          className="bg-slate-300 p-10 flex max-w-sm lg:max-w-xl mx-auto flex-col gap-4"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              {...register("email")}
              defaultValue={employee.email}
              placeholder=""
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name1" value="Your Name" />
            </div>
            <TextInput
              id="name1"
              type="text"
              {...register("user")}
              defaultValue={employee.user}
              required
            />
          </div>
          <div>
            <div>
              <Label htmlFor="file-upload-helper-text" value="Upload file" />
            </div>
            <FileInput {...register("photo")} id="file-upload-helper-text" />
          </div>

          <Button
            //  onClick={()=>handleUpdateUser(employee)}
            type="submit"
          >
            Save
          </Button>
        </form>
      ))}
    </div>
  );
};

export default ProfileSetting;