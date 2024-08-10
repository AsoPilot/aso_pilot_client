import Axios from './axios.js'
// import { useNavigate } from "react-router";
// const navigate = useNavigate()
const API = async ({
  url,
  method,
  responseType,
  data,
  cancelToken,
  params,
  headers,
  onUploadProgress
}) => {
  let axiosRequestObject = {
    method,
    url,
    data,
    headers,
    responseType,
    params,
    ...(cancelToken
      ? {
        cancelToken,
      }
      : ""),
    onUploadProgress
  };

  //REQUEST
  try {
    let request = await Axios.request(axiosRequestObject);
    return request.data;
  } catch (err) {
    if (!err.response) {
      return Promise.reject(err)
    }
    else if (err.response?.status === 401) {
      //   navigate("/")
      return Promise.reject(err)
    }
    else return err.response
  }
};

export default API