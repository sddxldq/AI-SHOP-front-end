import axios from "axios";

// const formData = new FormData();
// const apiKey = process.env.REACT_APP_DEEPAI_KEY;

// export const deepai = async (prompt) => {  
//   formData.append('text', prompt);
//   try {
//     const response = await axios.post(`https://api.deepai.org/api/comics-portrait-generator`, formData,{
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'api-key': apiKey,
//         },
//       }
//     );
//     return response.data.output_url;
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//   }
// };


const api = axios.create({
  baseURL: 'http://localhost:8080/image'
  // baseURL: 'http://3.136.86.150:8080/image'
});

export const deepai = async (prompt) => {  
  try {
    const response = await api.get(`/deepai`, {
      params: {
        style: `${prompt.style}`,
        text: `"${prompt.text}"`
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

