import axios from "axios";

const API =
  "https://apollo-voyages-api-demo.onrender.com/api";

export const getTours = async () => {
  try {
    const response = await axios.get(
      `${API}/packages`
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};