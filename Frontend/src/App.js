import React, { useCallback, useState } from "react";
import ConfigurationForm from "./components/ConfigurationForm";
import VendorCustomerManager from "./components/VendorCustomerManager";
import StartAndEndButton from "./components/StartAndEndButton";
import TicketProgress1 from "./components/TicketProgress1";
import LogDisplay from "./components/LogDisplay";
import TicketFlowChart from "./components/TicketFlowChart"; // << live chart
import { logSystemStart } from "./services/ticketingService";
import "./App.css";

const App = () => {
  const [vendors, setVendors] = useState(0);
  const [standardCustomers, setStandardCustomers] = useState(0);
  const [vipCustomers, setVipCustomers] = useState(0);

  const [configuration, setConfiguration] = useState({});
  const [tickets, setTickets] = useState([]); // filled by ConfigurationForm
  const [isConfigured, setIsConfigured] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const [logFunction, setLogFunction] = useState(null);
  const [latestLogData, setLatestLogData] = useState(null);

  // init logger
const handleLogInit = useCallback((logFns) => setLogFunction(logFns), []);
  const addLog = (message, level = "info") => logFunction?.addLog(message, level);

  // start/stop
  const handleStart = async () => {
    setIsRunning(true);

    const logData = {
      totalTickets: tickets.length,
      ticketReleaseRate: Number(configuration.ticketReleaseRate),
      customerRetrievalRate: Number(configuration.customerRetrievalRate),
      maxTicketCapacity: Number(configuration.maxTicketCapacity),
      vendors,
      standardCustomers,
      vipCustomers,
    };
    setLatestLogData(logData);

    try {
      await logSystemStart(logData);
      addLog("System started and logged successfully.");
    } catch (e) {
      addLog(`Failed to log system start: ${e.message}`, "error");
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    logFunction?.logSystemStop();
  };

  // from ConfigurationForm
  const handleConfiguration = (config) => {
    setConfiguration(config);
    setIsConfigured(true);
    addLog("Configuration updated successfully.");
  };

  const totalTickets = tickets.length;

  return (
    <div className="shell">
      <header className="topbar">
        <h1>Event Ticketing System</h1>
        <p className="muted">Real-time release & retrieval dashboard</p>
      </header>

      <div className="layout">
        {/* LEFT */}
        <aside className="left-col">
          <div className="card">
            <ConfigurationForm
              setConfiguration={handleConfiguration}
              setTickets={setTickets}
              addLog={addLog}
              disabled={isRunning}
            />
          </div>
        </aside>

        {/* MIDDLE */}
        <section className="mid-col">
          <div className="card">
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

          <div className="card">
            <TicketProgress1
              totalTickets={totalTickets}
              maxTicketCapacity={Number(configuration.maxTicketCapacity || 0)}
            />
          </div>

          <div className="card" style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <StartAndEndButton
              isConfigured={isConfigured}
              isRunning={isRunning}
              onStart={handleStart}
              onStop={handleStop}
              vendors={vendors}
            />
          </div>
        </section>

        {/* RIGHT */}
        <aside className="right-col">
          <div className="card">
            <LogDisplay onLog={handleLogInit} latestLogData={latestLogData} />
          </div>

          <div className="card">
            <TicketFlowChart
              config={configuration}
              vendors={vendors}
              standardCustomers={standardCustomers}
              vipCustomers={vipCustomers}
              isRunning={isRunning}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default App;
