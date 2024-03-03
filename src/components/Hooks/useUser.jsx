import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
    const { user } = useContext(AuthContext);
  const axiosSecure=useAxiosSecure()
  const { data: users = [] ,refetch} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?email=${user.email}`
      );
      return res.data;
    },
  });

    return [users,refetch]
};

export default useUser;