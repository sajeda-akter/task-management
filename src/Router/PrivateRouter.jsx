import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const PrivateRouter = ({children}) => {
const {user,loading}=useContext(AuthContext)
const location=useLocation()
if(loading){
    return <p className="text-3xl font-medium">Loading...</p>
}

if(user){
    return children
}

    return <Navigate to='/login' state={location.pathname}>

    </Navigate>
};

export default PrivateRouter;