import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8080/'
  // baseURL: 'http://3.136.86.150:8080/'
});

export const davinci = async (prompt) => {
  try {
      const response = await api.get(`/chat`, {
        params: {
          q: `"${prompt}"`
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
};
