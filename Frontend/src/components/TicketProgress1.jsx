import React from 'react';
import './TicketProgress1.css';

const TicketProgress1 = ({ totalTickets, maxTicketCapacity }) => {
  // Only calculate percentage if maxTicketCapacity is not zero
  const percentage = maxTicketCapacity > 0 
    ? Math.min((totalTickets / maxTicketCapacity) * 100, 100) 
    : 0;

  return (
    <div className="ticket-bar-container">
      <div className="ticket-bar-info">
        {totalTickets}/{maxTicketCapacity} Ticket Pool
      </div>
      <div className="ticket-bar">
        <div
          className="ticket-bar-fill"
          style={{ width: `${percentage}%` }}
        >
        </div>
      </div>
    </div>
  );
};

export default TicketProgress1;