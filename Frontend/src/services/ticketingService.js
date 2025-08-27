//Frontend\src\services\ticketingService.js
import axios from "axios";

const fromEnv = (process.env.REACT_APP_API_URL || process.env.REACT_APP_API_BASE || "").replace(/\/+$/, "");

// Prefer: ENV → (dev) localhost → (prod) relative /api (with Vercel rewrite or Nginx proxy)
const API_BASE_URL =
  fromEnv ||
  (process.env.NODE_ENV === "development" ? "http://localhost:8081/api" : "/api");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

const unwrap = (p) => p.then((r) => r.data);

export const createTicket    = (ticketData) => unwrap(api.post("/tickets", ticketData));
export const createLog       = (logData)    => unwrap(api.post("/logs", logData));
export const logSystemStart  = (logData)    => unwrap(api.post("/logs/system-start", logData));
export const getLogs         = ()           => unwrap(api.get("/logs"));
