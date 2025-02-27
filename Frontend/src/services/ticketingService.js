import axios from "axios";

// Set the base URL for your backend API
const API_BASE_URL = "http://localhost:8080/api"; // Replace with your actual backend URL

// Function to create a new ticket
export const createTicket = async (ticketData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tickets`, ticketData);
    return response.data;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};

// Function to create a new log
export const createLog = async (logData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logs`, logData);
    return response.data;
  } catch (error) {
    console.error("Error creating log:", error);
    throw error;
  }
};

// Function to log system start data
export const logSystemStart = async (logData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logs/system-start`, logData);
    return response.data;
  } catch (error) {
    console.error("Error logging system start:", error);
    throw error;
  }
};

// Function to get logs from backend
export const getLogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/logs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};
