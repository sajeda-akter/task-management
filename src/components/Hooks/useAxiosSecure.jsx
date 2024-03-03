import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../../AuthProvider/AuthProvider";
// import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
  baseURL: "https://task-management-server-six-zeta.vercel.app",
});
const useAxiosSecure = () => {
  // const {logout}=useContext(AuthContext)
  // const navigate=useNavigate()


  axiosSecure.interceptors.request.use(function(config){
    const token=localStorage.getItem('access-token')
    config.headers.authorization=`Bearer ${token}`
    return config;
  },function(error){
    return Promise.reject(error)
  }
  )

  // // intercepters 401 and 403 status
  axiosSecure.interceptors.response.use(function (response) {
    return response;
}, async (error) => {
    const status = error.response.status;
    // console.log('status error in the interceptor', status);
    // for 401 or 403 logout the user and move the user to the login
    if (status === 401 || status === 403) {
      console.log('status code...',status,'please logout')
        // await logout();
        // navigate('/login');
     
    }
    return Promise.reject(error);
})

  return axiosSecure;
};

export default useAxiosSecure;
