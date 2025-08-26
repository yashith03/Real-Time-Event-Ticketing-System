import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./LineChart.css";

/**
 * Props:
 *  config = {
 *    totalTickets,
 *    ticketReleaseRate,        // seconds per ticket per vendor
 *    customerRetrievalRate,    // seconds per ticket per customer
 *    maxTicketCapacity
 *  }
 *  vendors, standardCustomers, vipCustomers, isRunning
 */
export default function TicketFlowChart({
  config,
  vendors = 0,
  standardCustomers = 0,
  vipCustomers = 0,
  isRunning = false,
}) {
  const {
    totalTickets = 0,
    ticketReleaseRate = 1,
    customerRetrievalRate = 1,
    maxTicketCapacity = 0,
  } = config || {};

  const customers = (standardCustomers || 0) + (vipCustomers || 0);
  const yMax = Math.max(Number(totalTickets || 0), Number(maxTicketCapacity || 0), 10);

  // series: [{t: 0, released: 0, sold: 0, pool: 0}, ...]
  const [series, setSeries] = useState([{ t: 0, released: 0, sold: 0, pool: 0 }]);

  // internal counters held in refs to avoid stale closures
  const tickRef = useRef(0);
  const releasedRef = useRef(0);
  const soldRef = useRef(0);
  const poolRef = useRef(0);
  const timerRef = useRef(null);

  // reset whenever config or actor counts change OR when we switch from not running -> running
  useEffect(() => {
    tickRef.current = 0;
    releasedRef.current = 0;
    soldRef.current = 0;
    poolRef.current = 0;
    setSeries([{ t: 0, released: 0, sold: 0, pool: 0 }]);
  }, [totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity, vendors, customers, isRunning]);

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }

    // 1-second tick
    timerRef.current = setInterval(() => {
      tickRef.current += 1;
      const t = tickRef.current;

      let released = releasedRef.current;
      let sold = soldRef.current;
      let pool = poolRef.current;

      const remainingToRelease = Math.max(0, totalTickets - released);
      const remainingToSell = Math.max(0, totalTickets - sold);
      const poolRoom = Math.max(0, maxTicketCapacity - pool);

      // Vendors release: every ticketReleaseRate seconds, each vendor releases exactly 1 ticket
      let releaseBurst = 0;
      if (ticketReleaseRate > 0 && vendors > 0 && t % ticketReleaseRate === 0) {
        releaseBurst = vendors;
      }
      // Cap by remaining tickets and pool capacity
      releaseBurst = Math.min(releaseBurst, remainingToRelease, poolRoom);

      released += releaseBurst;
      pool += releaseBurst;

      // Customers buy: every customerRetrievalRate seconds, each customer buys 1 ticket
      let buyBurst = 0;
      if (customerRetrievalRate > 0 && customers > 0 && t % customerRetrievalRate === 0) {
        buyBurst = customers;
      }
      // Cap by pool availability and remaining tickets to sell
      buyBurst = Math.min(buyBurst, pool, remainingToSell);

      sold += buyBurst;
      pool -= buyBurst;

      releasedRef.current = released;
      soldRef.current = sold;
      poolRef.current = pool;

      setSeries(prev => {
        const next = prev.concat([{ t, released, sold, pool }]);
        // keep last ~600 points to avoid growing forever
        return next.length > 600 ? next.slice(next.length - 600) : next;
      });

      // stop auto when everything is sold
      if (sold >= totalTickets && totalTickets > 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [isRunning, totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity, vendors, customers]);

  // recharts data format
  const chartData = useMemo(
    () => series.map(p => ({
      time: `t+${p.t}s`,
      released: p.released,
      sold: p.sold,
      pool: p.pool,
    })),
    [series]
  );

  return (
    <div className="chart-container">
      <h3 className="chart-title">Ticket Release and Retrieval Trends</h3>
      <ResponsiveContainer width="100%" height={230}>
        <RechartsLineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" interval={"preserveStartEnd"} />
          <YAxis domain={[0, yMax]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="released"   name="Tickets Released"  stroke="#7d8cff" dot={false} />
          <Line type="monotone" dataKey="sold"       name="Tickets Sold"      stroke="#66e6a3" dot={false} />
          <Line type="monotone" dataKey="pool"       name="Pool Size"         stroke="#f9c74f" dot={false} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
