import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8080/'
});

export const dalle = async (prompt) => {
  try {
    const response = await api.get(`/image`, {
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
