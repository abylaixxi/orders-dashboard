# 📊 Orders Dashboard (RetailCRM + Supabase + Telegram)

## 🚀 Live Demo
https://orders-dashboard-sigma.vercel.app/

## 📦 GitHub
https://github.com/abylaixxi/orders-dashboard

---

## 🧠 Project Description

This project is an automated order analytics system.

It pulls orders from RetailCRM API, stores them in Supabase, visualizes data in a dashboard, and sends Telegram notifications for high-value orders.

---

## 🏗 Architecture

RetailCRM → Node.js Sync Script → Supabase DB → Next.js Dashboard → Telegram Bot Alerts

---

## ⚙️ Tech Stack

- Next.js
- Supabase
- RetailCRM API
- Node.js
- Recharts
- Telegram Bot API
- Vercel

---

## 📊 Features

- Import orders from RetailCRM API
- Sync data to Supabase database
- Dashboard with revenue analytics
- Graph visualization (Recharts)
- Telegram notifications for orders > 50,000 ₸

---

## 🤖 AI Usage (Claude Code / AI Tools)

### Prompts used:

- "Create script to upload mock_orders.json to RetailCRM API"
- "Fix API error: order is not loaded"
- "Build sync script RetailCRM → Supabase"
- "Create dashboard with chart using Recharts"
- "Fix Next.js App Router vs Pages Router conflict"
- "Design SaaS-style dashboard UI"

---

## 🧱 Problems & Solutions

### ❌ Issue 1: RetailCRM API errors
Fixed incorrect order format and missing required fields.

### ❌ Issue 2: Supabase sync structure
Normalized order data before inserting into database.

### ❌ Issue 3: Next.js routing conflict
Removed App Router and used only Pages Router.

### ❌ Issue 4: GitHub authentication
Solved using Personal Access Token instead of password.

---

## 📩 Telegram Integration

Bot sends notification when order value exceeds 50,000 ₸.

---

## 🎯 Result

Fully working ETL + analytics system with real-time notifications and dashboard visualization.

