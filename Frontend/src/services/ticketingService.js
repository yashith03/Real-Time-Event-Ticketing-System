// src/services/ticketingService.js
import axios from "axios";

// Prefer env var; fall back to relative '/api' (works with CRA proxy or Nginx proxy)
// Last fallback keeps local direct calls.
const API_BASE_URL =
  (process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.replace(/\/+$/, "")) ||
  "/api" ||
  "http://localhost:8081/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
  // withCredentials: true, // enable only if you use cookies/sessions
});

const unwrap = (p) => p.then((r) => r.data);

export const createTicket    = (ticketData) => unwrap(api.post("/tickets", ticketData));
export const createLog       = (logData)    => unwrap(api.post("/logs", logData));
export const logSystemStart  = (logData)    => unwrap(api.post("/logs/system-start", logData));
export const getLogs         = ()           => unwrap(api.get("/logs")); // needs backend GET /logs
