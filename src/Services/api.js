import axios from "axios";

const API_URL = 
"https://script.google.com/macros/s/AKfycbz0bKVJ6Fc8UL7hFv9gAzdDlKyLHIE9Vskwuwydd3uJ9DSdoFt82OZ69ZB_sOwRZn2PlA/exec";

export async function getPPCIs() {
  const response = await axios.get(API_URL);
  return response.data;
}