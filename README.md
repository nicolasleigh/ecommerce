# 🐾 Petify

A **full-stack e-commerce platform** for browsing and purchasing pets, featuring real-time chat, advanced product filtering, and a scalable, secure backend architecture.

## 📦 Project Overview

**Petify** is a complete e-commerce solution built from the ground up, enabling users to discover, purchase, and interact around pet listings. It consists of **three independent applications**:

* **User Web App** – for shopping, chatting, and order tracking
* **Admin Dashboard** – for product management, customer support, and data analytics
* **Backend API Server** – providing a scalable, secure RESTful API

Designed for both usability and scalability, Petify features dynamic filtering, real-time communication, and a modular architecture ready for production deployment.

## 💡 Motivation

The goal of **Petify** was to sharpen my full-stack development skills by building a real-world, end-to-end web application. I wanted to:

* Go beyond CRUD apps and tackle **complex e-commerce logic**
* Explore **real-time systems** with Socket.IO
* Design a **secure, production-ready** deployment using Docker and Caddy
* Improve my **frontend engineering** using React, Redux, and Tailwind CSS

This project allowed me to explore the intersection of UI/UX, backend scalability, and DevOps workflows in a hands-on, meaningful way.

## 👨‍💻 My Role

I built **every aspect of Petify**, including:

* **Frontend (User & Admin):**
  * Responsive UI development with **React**, **Redux**, and **Tailwind CSS**
* **Backend API:**
  * RESTful services with **Node.js** and **Express**
  * File uploads, user authentication, and real-time chat
* **Database Design:**
  * Schema modeling and data relationships in **MongoDB**
* **DevOps & Deployment:**
  * Containerization with **Docker**
  * Orchestration via **docker-compose**
  * Reverse proxy and HTTPS setup with **Caddy**

This full ownership gave me deep exposure to real-world architectural and problem-solving challenges across the stack.

## 🧰 Tech Stack

### 🌐 Frontend

* **React** – Dynamic, component-based UI for user and admin apps
* **Redux** – Predictable global state management
* **Tailwind CSS** – Fast, responsive UI styling

### 🖥 Backend

* **Node.js + Express** – RESTful API with middleware architecture
* **MongoDB + Mongoose** – NoSQL database with flexible schema
* **Formidable** – File upload handling (product images)
* **Socket.IO** – Real-time communication for chat features

### ⚙️ DevOps & Deployment

* **Docker** – Containerization of all services
* **docker-compose** – Service orchestration
* **Caddy** – Reverse proxy server with automatic HTTPS and routing

## 🚀 Key Features

### 🛒 User App

* **Product Browsing & Details**
  * Explore pets by category
  * Detailed product descriptions with images
* **Smart Search & Filtering**
  * Search by name or category
  * Filter by category, price, and rating
  * Sort by price
* **Wishlist & Shopping Cart**
  * Save pets for later or purchase directly
* **Order Management**
  * Place orders and track progress
* **Reviews**
  * Star ratings and written feedback per product
* **Real-Time Chat**
  * Live support and conversation with admins using Socket.IO

### 🛠 Admin Dashboard

* **Dashboard Overview**
  * Sales metrics: orders, revenue, products, customers
  * **Bar chart** visualization of orders by category
  * Recent orders and real-time customer messages
* **Product & Category Management**
  * Add/edit/delete listings and categories
* **Order Tracking**
  * View all orders and their statuses
* **Live Chat**
  * Communicate with customers in real time
* **Admin Profile**
  * Update admin info and reset password
* **Search Tools**
  * Find products by name or category
  * Locate orders by order ID
