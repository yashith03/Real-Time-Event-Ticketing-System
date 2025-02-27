import React, { useState } from "react";
import ConfigurationForm from "./components/ConfigurationForm";
import VendorCustomerManager from "./components/VendorCustomerManager";
import StartAndEndButton from "./components/StartAndEndButton";
import TicketProgress1 from "./components/TicketProgress1";
import LogDisplay from "./components/LogDisplay";
import CustomLineChart from "./components/LineChart";
import { logSystemStart, getLogs } from "./services/ticketingService"; // API service
import "./App.css";

const App = () => {
  const [vendors, setVendors] = useState(0);
  const [standardCustomers, setStandardCustomers] = useState(0);
  const [vipCustomers, setVipCustomers] = useState(0);
  const [configuration, setConfiguration] = useState({});
  const [tickets, setTickets] = useState([]);
  const [isConfigured, setIsConfigured] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [poolSize, setPoolSize] = useState(0);
  const [logFunction, setLogFunction] = useState(null);
  const [latestLogData, setLatestLogData] = useState(null);

  const formatDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}:${month}:${day}:[${hours}:${minutes}]`;
  };

  const handleLogInit = (logFns) => {
    setLogFunction(logFns);
  };

  const addLog = (message, level = "info") => {
    if (logFunction) {
      logFunction.addLog(message, level);
    }
  };

  const handleStart = async () => {
    setIsRunning(true);

    const logData = {
      totalTickets: tickets.length,
      ticketReleaseRate: configuration.ticketReleaseRate,
      customerRetrievalRate: configuration.customerRetrievalRate,
      maxTicketCapacity: configuration.maxTicketCapacity,
      vendors: vendors,
      standardCustomers: standardCustomers,
      vipCustomers: vipCustomers,
    };

    setLatestLogData(logData);

    try {
      const savedLog = await logSystemStart(logData);
      console.log(`System started and logged successfully. Log ID: ${savedLog.id}`);
      addLog(`System started and logged successfully. `);
    } catch (error) {
      console.error(`Failed to log system start: ${error.message}`);
      addLog(`Failed to log system start: ${error.message}`, "error");
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    if (logFunction) {
      logFunction.logSystemStop();
    }
  };

  const handleConfiguration = (config) => {
    setConfiguration(config);
    setIsConfigured(true);
    setPoolSize(config.poolSize || 0);
    if (logFunction) {
      addLog(`Configuration updated successfully. ${formatDate()}`);
    }
  };

  // Sample data for the chart
  const chartData = [
    { period: "Week 1", ticketsReleased: 25, ticketsRetrieved: 20 },
    { period: "Week 2", ticketsReleased: 35, ticketsRetrieved: 30 },
    { period: "Week 3", ticketsReleased: 45, ticketsRetrieved: 40 },
    { period: "Week 4", ticketsReleased: 55, ticketsRetrieved: 50 },
    { period: "Week 5", ticketsReleased: 60, ticketsRetrieved: 55 },
    { period: "Week 6", ticketsReleased: 70, ticketsRetrieved: 65 },
  ];

  // Calculate total tickets (sum of all ticket types)
  const totalTickets = tickets.length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Event Ticketing System</h1>
      </header>
      <main>
        <div className="content-wrapper">
          <div className="left-panel">
            <ConfigurationForm
              setConfiguration={handleConfiguration}
              setTickets={setTickets}
              addLog={addLog}
              disabled={isRunning}
            />

            <div className="progress-section my-4 mx-auto max-w-md">
              <TicketProgress1 
                totalTickets={totalTickets} 
                maxTicketCapacity={configuration.maxTicketCapacity || 0}
              />
            </div>

            <StartAndEndButton
              isConfigured={isConfigured}
              isRunning={isRunning}
              onStart={handleStart}
              onStop={handleStop}
              vendors={vendors}
            />

            <VendorCustomerManager
              vendors={vendors}
              setVendors={setVendors}
              standardCustomers={standardCustomers}
              setStandardCustomers={setStandardCustomers}
              vipCustomers={vipCustomers}
              setVipCustomers={setVipCustomers}
              addLog={addLog}
              isRunning={isRunning}
            />
          </div>

          <div className="right-panel">
            <LogDisplay 
              onLog={handleLogInit} 
              latestLogData={latestLogData}
            />
          </div>
        </div>

        <div className="chart-section my-6">
          <CustomLineChart data={chartData} />
        </div>
      </main>
    </div>
  );
};

export default App;