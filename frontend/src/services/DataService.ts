import axios from "axios";

const API_URL = "http://localhost:8000/api/quizzes";

export const getAllQuizzes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

export const getQuizById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quiz with ID ${id}:`, error);
    throw error;
  }
};
