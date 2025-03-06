# Doctor Search & Appointment Booking System

## 📌 Project Overview
The **Doctor Search & Appointment Booking System** is a full-stack web application built using the **MERN** stack for Arogo AI’s **Clinic360** platform. It allows:
- **Patients** to search for doctors by name, specialty, or location and book appointments.
- **Doctors** to set their availability and manage appointments.
- **Authentication** for doctors and patients with secure login and role-based access.

## 🚀 Live Demo
- **Backend:** [Deployed Link](https://arogo-ai-intern-assignment.onrender.com/)
- **Frontend API:** [Deployed Link](https://arogo-ai-intern-assignment-frontend.vercel.app/)

## 🛠️ Tech Stack
### **Frontend:**
- React.js (Vite)
- Tailwind CSS
- Redux / Context API

### **Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt.js for password hashing
- Nodemailer for email notifications

## 🎯 Features
### **1. User Authentication & Role Management**
- JWT-based authentication for **Doctors** and **Patients**.
- Patients can **register, login, and manage** their appointments.
- Doctors can **register, login, and set availability**.
- Secure password hashing using **bcrypt.js**.

### **2. Doctor Search & Profile Management**
- Patients can search for doctors using:
  - **Specialty** (e.g., Cardiologist, Dermatologist, etc.).
  - **Location** (City, State).
  - **Doctor’s Name** (partial match search).
- Each doctor has a **profile page** displaying:
  - Name, Specialty, Experience, Location, and Availability Slots.

### **3. Appointment Booking System**
- Doctors **set availability** (working hours and locations).
- Patients can **book an available slot**.
- **Concurrency handling** to prevent double booking.
- Patients can **cancel appointments**.
- **Email notifications** for bookings and cancellations using Nodemailer.

### **4. Web Interface (Frontend)**
- **Patient Portal:**
  - Search for doctors.
  - Book or cancel appointments.
- **Doctor Dashboard:**
  - Set up consultation locations.
  - Define and update availability.
  - View upcoming appointments.
- **State management** using Redux or Context API.

### **5. Deployment & Documentation**
- **Backend:** Hosted on Render / AWS Lambda.
- **Frontend:** Deployed on Vercel / Netlify.

## 🔧 Installation & Setup
### **1. Clone the Repository**
```bash
 git clone https://github.com/yourusername/doctor-booking-system.git
 cd doctor-booking-system
```

### **2. Backend Setup**
```bash
 cd backend
 npm install
 npm start
```
- Configure `.env` file with:
  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  SMTP_USER=your_email
  SMTP_PASS=your_email_password
  ````

### **3. Frontend Setup**
```bash
 cd frontend
 npm install
 npm run dev
```

## 🛠️ API Endpoints
### **Authentication**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register a new user (Patient/Doctor) |
| `/api/auth/login` | POST | Login user and get JWT token |

### **Doctor Management**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/doctors` | GET | Get list of doctors (filtered by name, location, specialty) |
| `/api/doctors/:id` | GET | Get details of a specific doctor |
| `/api/doctors/:id/availability` | PUT | Update doctor's availability |

### **Appointments**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/appointments` | POST | Book an appointment |
| `/api/appointments/:id` | DELETE | Cancel an appointment |
| `/api/appointments/:userId` | GET | Get patient’s appointments |

## 📝 Sample API Requests
### **Register a Patient**
```bash
POST /api/auth/register
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass",
  "role": "patient"
}
```

### **Search for Doctors**
```bash
GET /api/doctors?specialty=Cardiologist&location=New York
```

### **Book an Appointment**
```bash
POST /api/appointments
Content-Type: application/json
{
  "doctorId": "12345",
  "patientId": "67890",
  "date": "2025-03-10",
  "time": "10:00 AM"
}
```

## 📂 Folder Structure
```
📁 doctor-booking-system
 ├── 📁 backend (Node.js, Express, MongoDB)
 ├── 📁 frontend (React.js, CSS)
 ├── 📜 README.md
```

## 📌 Video Demonstration
- **[Watch Here](#)** (Link to a 5-10 min recording explaining the project)

## 🔥 Future Enhancements
- Add **real-time notifications** using WebSockets.
- Implement **doctor reviews and ratings**.
- Enhance UI with more **interactive elements**.


