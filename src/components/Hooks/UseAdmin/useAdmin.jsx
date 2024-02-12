import { useQuery } from "@tanstack/react-query";
import PublicAxiosSecure from "../PublicAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";


const useAdmin = () => {
    const publicSecure=PublicAxiosSecure()
    const {user}=useContext(AuthContext)
    const {data:isAdmin=[]}=useQuery({
        queryKey:['isAdmin'],
        queryFn:async()=>{
            const res=await publicSecure(`/users/admin/${user.email}`)
       return (res.data)
        }
    })
    return isAdmin
};

export default useAdmin;