import axios from "axios";


const PublicAxiosSecure = () => {
    const publicSecure=axios.create({
        baseURL: 'https://task-management-server-six-zeta.vercel.app'
      });
    return publicSecure
};

export default PublicAxiosSecure;

