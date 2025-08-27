//Frontend\src\components\ConfigurationForm.jsx

import React, { useState } from "react";
import "./ConfigurationForm.css";

const ConfigurationForm = ({ 
  setConfiguration, 
  setTickets, 
  addLog,
  disabled 
}) => {
  const [formValues, setFormValues] = useState({
    totalTickets: "",
    ticketReleaseRate: "",
    customerRetrievalRate: "",
    maxTicketCapacity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = (values) => {
    const { totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity } = values;

    if (
      Number(totalTickets) <= 0 ||
      Number(ticketReleaseRate) <= 0 ||
      Number(customerRetrievalRate) <= 0 ||
      Number(maxTicketCapacity) <= 0
    ) {
      return "All values must be positive numbers.";
    }
    if (Number(totalTickets) > Number(maxTicketCapacity)) {
      return "Total Tickets cannot exceed Maximum Ticket Capacity.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the form is disabled
    if (disabled) {
      alert("Cannot modify configuration while program is running.");
      return;
    }

    const error = validateInputs(formValues);
    if (error) {
      alert(error);
      return;
    }

    const initialTickets = Array.from({ length: Number(formValues.totalTickets) }, () => ({
      status: "available",
    }));

    setConfiguration(formValues);
    setTickets(initialTickets);
    
    // Alert for successful configuration
    alert("Configuration added successfully!");
    
    addLog("Configuration updated successfully.");
  };

  return (
    <form className="configuration-form" onSubmit={handleSubmit}>
      <h2>Configuration Form</h2>
      <div className="input-field">
        <label htmlFor="totalTickets">Total number of Tickets </label>
        <input
          type="number"
          id="totalTickets"
          name="totalTickets"
          value={formValues.totalTickets}
          onChange={handleChange}
          required
          disabled={disabled}
        />
      </div>
      <div className="input-field">
        <label htmlFor="ticketReleaseRate">Ticket Release Rate(s)</label>
        <input
          type="number"
          id="ticketReleaseRate"
          name="ticketReleaseRate"
          value={formValues.ticketReleaseRate}
          onChange={handleChange}
          required
          disabled={disabled}
        />
      </div>
      <div className="input-field">
        <label htmlFor="customerRetrievalRate">Customer Retrieval Rate(s)</label>
        <input
          type="number"
          id="customerRetrievalRate"
          name="customerRetrievalRate"
          value={formValues.customerRetrievalRate}
          onChange={handleChange}
          required
          disabled={disabled}
        />
      </div>
      <div className="input-field">
        <label htmlFor="maxTicketCapacity">Maximum Ticket Capacity</label>
        <input
          type="number"
          id="maxTicketCapacity"
          name="maxTicketCapacity"
          value={formValues.maxTicketCapacity}
          onChange={handleChange}
          required
          disabled={disabled}
        />
      </div>
<button type="submit" className="submit-btn" disabled={disabled}>
  Submit
</button>

    </form>
  );
};

export default ConfigurationForm;