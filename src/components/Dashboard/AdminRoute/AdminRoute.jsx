import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAdmin from "../../Hooks/UseAdmin/useAdmin";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const [isAdmin,isAdminLoading]=useAdmin()
    const location=useLocation()

   if(loading || isAdminLoading){
    return <p className="text-3xl font-medium">Loading...</p>
}

if(user && isAdmin){
    return children
}

    return <Navigate to='/login' state={location.pathname}>

    </Navigate>
};


export default AdminRoute;