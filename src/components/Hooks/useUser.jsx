import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import PublicAxiosSecure from "./PublicAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
    const { user } = useContext(AuthContext);
  const publicSecure = PublicAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await publicSecure(
        `http://localhost:5000/users?email=${user.email}`
      );
      return res.data;
    },
  });
    return users
};

export default useUser;