import axios from "axios";

const formData = new FormData();
const apiKey = process.env.REACT_APP_DEEPAI_KEY;

export const deepai = async (prompt) => {  
  formData.append('text', prompt);
  try {
    const response = await axios.post(`https://api.deepai.org/api/comics-portrait-generator`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'api-key': apiKey,
        },
      }
    );
    return response.data.output_url;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
