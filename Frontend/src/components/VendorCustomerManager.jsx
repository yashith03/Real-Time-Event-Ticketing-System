import React from "react";
import "./VendorCustomerManager.css";

const VendorCustomerManager = ({
  vendors,
  setVendors,
  standardCustomers,
  setStandardCustomers,
  vipCustomers,
  setVipCustomers,
  onSubmit,
  addLog
}) => {
  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => {
    if (value > 0) setter(value - 1);
  };

  const handleSubmit = () => {
    const data = {
      vendors,
      standardCustomers,
      vipCustomers,
    };

    // Add log when the submit button is pressed
    if (addLog) {
      addLog("Customers and vendors updated", "info");
    }

    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <div className="manager-container">
      <div className="card">
        <h3 id="vendor">Vendors</h3>
        <h2>{vendors}</h2>
        <button onClick={() => decrement(setVendors, vendors)}>-</button>
        <button onClick={() => increment(setVendors, vendors)}>+</button>
      </div>

      <div className="card">
        <h3>Standard Customers</h3>
        <h2>{standardCustomers}</h2>
        <button onClick={() => decrement(setStandardCustomers, standardCustomers)}>-</button>
        <button onClick={() => increment(setStandardCustomers, standardCustomers)}>+</button>
      </div>

      <div className="card">
        <h3>VIP Customers</h3>
        <h2>{vipCustomers}</h2>
        <button onClick={() => decrement(setVipCustomers, vipCustomers)}>-</button>
        <button onClick={() => increment(setVipCustomers, vipCustomers)}>+</button>
      </div>

      <div className="submit-container">
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default VendorCustomerManager;
