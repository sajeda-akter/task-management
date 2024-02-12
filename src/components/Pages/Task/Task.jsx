import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import PublicAxiosSecure from "../../Hooks/PublicAxiosSecure";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { FloatingLabel, Select } from "flowbite-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useQuery } from "@tanstack/react-query";

const Task = () => {
  const publicSecure = PublicAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await publicSecure("/users");
      return res.data;
    },
  });
  const [selectedDay, setSelectedDay] = useState(new Date());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // task create
  const taskSubmit = (data) => {
    // e.preventDefault()
    const AssignUser = users.find((u) => u.user == data.user);

    const date = format(selectedDay, "PPP");
    const newTask = {
      task: data.title,
      description: data.description,
      date,
      priority: data.priority,
      user: AssignUser.user,
      email: AssignUser.email,
      taskAction: "pending",
    };
    publicSecure.post("/task", newTask).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You add a task",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      reset();
    });
  };

  const footer = selectedDay ? (
    <p>
      You selected{" "}
      <span className="text-[#4E9F3D] font-bold">
        {format(selectedDay, "PPP")}
      </span>
      .
    </p>
  ) : (
    <p>Please pick a day.</p>
  );
  return (
    <form
      onSubmit={handleSubmit(taskSubmit)}
      className="lg:w-3/4 w-11/12 bg-[#D9EDBF] rounded-md p-12  mx-auto mt-32 shadow-xl"
    >
      <h1 className="border-b-4 border-[#508D69] text-[#4E9F3D] font-bold px-2 w-56 text-2xl mb-12 pb-2 mx-auto text-center ">
        Create your task
      </h1>

      <FloatingLabel
        {...register("title")}
        name="title"
        type="text"
        variant="filled"
        label="Enter your title"
        color="success"
        required
      />
      {errors.title && (
        <p className="text-red-700 my-1 font-medium">Email must be need</p>
      )}
      <FloatingLabel
        {...register("description")}
        name="description"
        required
        type="text"
        variant="filled"
        label="Enter your description"
        color="success"
      />
      {errors.description && (
        <p className="text-red-700 my-1 font-medium">Email must be need</p>
      )}

      <div className="flex justify-around mb-12 mt-8">
        <div className="my-4 flex items-center ">
          <p className="me-4 text-[16px] font-medium">Task Priority</p>
          <Select {...register("priority", { required: true })}>
            <option disabled selected>
              Select task priority
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </div>
        <div className="my-4 flex items-center ">
          <p className="me-4 text-[16px] font-medium">Assign User</p>
          <Select {...register("user", { required: true })}>
            <option disabled selected>
              Select task assign user
            </option>
            {users.map((user) => (
              <option key={user._id}>{user.user}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-around text-xl">
        <p> {footer} </p>
        <DayPicker
          mode="single"
          required
          selected={selectedDay}
          onSelect={setSelectedDay}
        />
        {/* {errors.email && (
          <p className="text-red-700 my-1 font-medium">Email must be need</p>
        )} */}
      </div>

      <div className="w-72 mx-auto my-8">
        <button className=" border-2 border-[#508D69] px-2 py-3 text-xl rounded-md w-72 hover:bg-[#508D69] hover:text-white hover:border-none">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Task;
