import axios from "axios";
import config from "../config";

axios.defaults.baseURL = config.BASE_URL; //BASE URL

axios.interceptors.request.use(
  function (axios_config) {
    // console.log(localStorage.getItem('token'), "------------------------------_>TOKEN")
    axios_config.headers.authorization = localStorage.getItem("token");
    return axios_config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axios;
