import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
});
export default axiosInstance;