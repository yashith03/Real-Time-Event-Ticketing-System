import React, { useState, useEffect } from "react";
import "./LogDisplay.css";

const LogDisplay = ({ onLog, latestLogData }) => {
  const [logs, setLogs] = useState([]);

  const formatDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}:${month}:${day}:[${hours}:${minutes}]`;
  };

  const addLog = (message, level = "info") => {
    setLogs((prevLogs) => [
      ...prevLogs,
      { message, level, time: new Date().toLocaleTimeString() },
    ]);
  };

  const logSystemStart = (config) => {
    const startDate = formatDate();
    addLog(`--System Started --${startDate}`, "start");
    
    addLog(`  totalTickets:        ${config.totalTickets || 0}`, "start");
    addLog(`  ticketReleaseRate:   ${config.ticketReleaseRate || 0} per second`, "start");
    addLog(`  customerRetrievalRate: ${config.customerRetrievalRate || 0} per second`, "start");
    addLog(`  maxTicketCapacity:   ${config.maxTicketCapacity || 0}`, "start");
    addLog(`  vendors:             ${config.vendors || 0}`, "start");
    addLog(`  standardCustomers:   ${config.standardCustomers || 0}`, "start");
    addLog(`  vipCustomers:        ${config.vipCustomers || 0}`, "start");
  };

  const logSystemStop = () => {
    const stopDate = formatDate();
    addLog(`--System stopped --${stopDate}`, "stop");
  };

  const clearLogs = () => {
    setLogs([]);
  };

  useEffect(() => {
    if (onLog) {
      onLog({ addLog, logSystemStart, logSystemStop });
    }
  }, [onLog]);

  // Add a new useEffect to log system start data when latestLogData changes
  useEffect(() => {
    if (latestLogData) {
      logSystemStart(latestLogData);
    }
  }, [latestLogData]);

  return (
    <div className="transaction-log">
      <div className="log-header">
        <span>Transaction Logs</span>
        <button onClick={clearLogs} className="clear-button">
          Clear Logs
        </button>
      </div>
      <div className="log-body">
        {logs.map((log, index) => (
          <div key={index} className={`log log-${log.level}`}>
            {log.level !== "start" && log.level !== "stop" && (
              <span className="log-time">{log.time}</span>
            )}
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogDisplay;