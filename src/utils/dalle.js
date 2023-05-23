import axios from "axios";

const api = axios.create({
  // baseURL: 'http://localhost:8080/image/'
  baseURL: 'http://3.136.86.150:8080/image'
});

export const dalle = async (prompt) => {
  try {
    const response = await api.get(`/dalle`, {
      params: {
        prompt: `"${prompt}"`,
        n: 1,
        size: '512x512'
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
