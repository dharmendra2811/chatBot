import axios from "axios";

// const BASE_URL='http://192.168.0.113:3000/api/bardapi' //Replace with System PC IP address
// const getBardApi=(userMsg)=>axios.get(BASE_URL+"?ques="+userMsg);

const API_KEY='AIzaSyCjjoakLNUyQ3_ahgGNJRpf5C413DaKaT0'
const geminiApi=`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`
// const geminiApi = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${API_KEY}`;
const geminiApiDemo=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`


async function chatWithGemini(userMessage) {
  try {
    const response = await axios.post(
      geminiApiDemo,
      {
        contents: [
          {
            parts: [
              {
                text: userMessage,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-GEMINI-PAYLOAD':'MEDELA'
        },
      }
    );

    // Extract the response data

    const responseData = response.data;
    console.log("===API RESPONSE===",JSON.stringify(response))
    // Extract the 'text' from the 'parts' in the response content
    const responseText = responseData.candidates[0]?.content?.parts[0]?.text || '';

    return responseText;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
}


export default {
    // getBardApi,
    chatWithGemini
}