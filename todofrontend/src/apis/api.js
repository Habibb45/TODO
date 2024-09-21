import axios from "axios";

// Base URL for your Laravel API
const API_URL = "http://127.0.0.1:8000/api";

// Fetch all todos
export const getData = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/getdata");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Add a new todo
export const addData = async (title) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/adddata", {
      name: title, // Adjusting to match your Laravel controller field
    });
    return response.data;
  } catch (error) {
    console.error("Error adding data:", error);
    return null;
  }
};

// Delete a todo
export const deleteData = async (id) => {
  if (!id) {
    console.error("ID is undefined");
    return;
  }

  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/deletedata/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
};

// Toggle the completed status of a todo
export const toggleData = async (id, completed) => {
  if (!id) {
    console.error("ID is undefined");
    return;
  }

  try {
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/toggletodo/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling data:", error);
    return null;
  }
};
