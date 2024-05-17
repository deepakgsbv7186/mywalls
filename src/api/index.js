import axios from "axios";

const API_KEY = "43829584-e6d6d2f8ea98f21c67ac7386b";

const URL = `https://pixabay.com/api/?key=${API_KEY}`;

const formatURL = (params) => {
  let url = URL + "&per_page=24&safesearch=true&editors_choice=true";
  if (!params) return url;

  let paramsKeys = Object.keys(params);
  paramsKeys?.map((key) => {
    let value = key === "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  return url;
};

export const callApi = async (params) => {
  try {
    const response = await axios.get(formatURL(params));
    return { success: true, data: response?.data };
  } catch (error) {
    console.log("🚀 ~ callApi ~ error:", error);
    return { success: false, message: error?.message };
  }
};
