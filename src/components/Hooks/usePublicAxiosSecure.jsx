import axios from "axios";

const usePublicAxiosSecure = () => {
    const publicSecure=axios.create({
        baseURL: 'https://task-management-server-six-zeta.vercel.app'
      });
    return publicSecure
};

export default usePublicAxiosSecure;