import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../useAxiosSecure";


const useAdmin = () => {
const axiosSecure=useAxiosSecure()
    const {user}=useContext(AuthContext)
    const {data:isAdmin=[],isAdminLoading}=useQuery({
        queryKey:['isAdmin'],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/admin/${user.email}`)
       return (res.data)
        }
    })
    return [isAdmin,isAdminLoading]
};

export default useAdmin;