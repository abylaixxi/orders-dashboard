import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data } = await supabase.from("orders").select("*");

    setOrders(data || []);

    const grouped = {};

    (data || []).forEach((o) => {
      const date = new Date(o.created_at).toISOString().split("T")[0];
      grouped[date] = (grouped[date] || 0) + (o.total_price || 0);
    });

    setChartData(
      Object.keys(grouped).map((date) => ({
        date,
        total: grouped[date]
      }))
    );
  }

  const total = orders.reduce((sum, o) => sum + (o.total_price || 0), 0);

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <h1 style={styles.title}>📊 Orders Dashboard</h1>
        <p style={styles.subtitle}>Analytics & CRM data overview</p>

        {/* KPI CARDS */}
        <div style={styles.cards}>
          <div style={styles.card}>
            <p>Total Revenue</p>
            <h2>{total.toLocaleString()} ₸</h2>
          </div>

          <div style={styles.card}>
            <p>Total Orders</p>
            <h2>{orders.length}</h2>
          </div>

          <div style={styles.card}>
            <p>Avg Order</p>
            <h2>
              {orders.length
                ? Math.round(total / orders.length)
                : 0} ₸
            </h2>
          </div>
        </div>

        {/* CHART */}
        <div style={styles.chartBox}>
          <h3>Revenue Trend</h3>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#4f46e5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TABLE */}
        <div style={styles.tableBox}>
          <h3>Recent Orders</h3>

          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.external_id}</td>
                  <td>{o.first_name} {o.last_name}</td>
                  <td>{o.phone}</td>
                  <td style={{ fontWeight: "bold" }}>
                    {o.total_price} ₸
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

/* =========================
   STYLES
========================= */
const styles = {
  page: {
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
    fontFamily: "Arial"
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: 20
  },
  title: {
    fontSize: 32,
    marginBottom: 5
  },
  subtitle: {
    color: "#94a3b8",
    marginBottom: 20
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 15,
    marginBottom: 20
  },
  card: {
    background: "#1e293b",
    padding: 15,
    borderRadius: 12
  },
  chartBox: {
    background: "#1e293b",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20
  },
  tableBox: {
    background: "#1e293b",
    padding: 15,
    borderRadius: 12
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  }
};