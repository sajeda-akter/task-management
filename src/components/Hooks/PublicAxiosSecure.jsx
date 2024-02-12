import axios from "axios";


const PublicAxiosSecure = () => {
    const publicSecure=axios.create({
        baseURL: 'http://localhost:5000'
      });
    return publicSecure
};

export default PublicAxiosSecure;

