import axios from "axios";

const API_KEY = "Vo8LJ0Ib2BjqT0J0kb1h_SReLYGTDa0BIzXxvx3OvsQ";

axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;

export const fetchArticles = async (query) => {
  const { data } = await axios.get(`/search/photos`, {
    params: { query },
  });
  return data.results;
};
