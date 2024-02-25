// api.js
import axios from "axios";

let baseURL = "http://18.117.76.190:5000/api/";
baseURL = "http://localhost:5000/api/";

const instance = axios.create({
  baseURL,
  timeout: 50000, // Set a timeout value if needed
});

// Get the token from local storage

const request = async (endpoint, method, data, config = {}) => {
  const token = localStorage.getItem("authToken");
  try {
    // Add the Authorization header with the token to the request config
    if (token) {
      config.headers = {
        Authorization: `${token}`,
        ...config.headers,
      };
    }

    // If the method is POST and data is FormData (for file uploads), add necessary headers
    if (method === "post" && data instanceof FormData) {
      config.headers = {
        ...config.headers,
        "Content-Type": "multipart/form-data",
      };
    }

    const response = await instance({
      method: method || "post", // Default to 'post', but can be overridden in config
      url: endpoint,
      data,
      ...config,
    });

    return response.data;
  } catch (error) {
    console.error("Error making request:", error.message);
    // Check if the error response has data and status code
    if (error.response && error.response.status === 500) {
      if (
        error.response?.data?.message == "Authentication failed: Invalid token"
      ) {
        localStorage.clear();
        window.location.replace("/");
      }
      // If it's a 500 error, throw an error with the response data
      throw new Error(error.response.data.message || "Internal Server Error");
    } else {
      // For other errors, log the error message and re-throw the error
      console.error("Error making request:", error.message);
      throw error;
    }
  }
};

export default request;
