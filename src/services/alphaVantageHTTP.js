import axios from 'axios';
const getBaseURL = () => {
  return process.env.APLHA_BASE_URL;
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    accept: 'application/json',
  },
});

export default axiosInstance;
