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
### **Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt.js for password hashing
- Nodemailer for email notifications

### **Frontend:**
- React.js (Vite)
- Vanilla CSS
- Redux / Context API *(Minimal work done in frontend)*

## 🔏 Project Challenges & Limitations
While I successfully built the backend with all required functionalities working smoothly, I faced **challenges integrating the frontend with the backend**, particularly in:
- **Fetching Appointments:** I encountered issues retrieving booked appointments for both patients and doctors.
- **Setting Availability:** Doctors' availability was not fully implemented due to time constraints and integration difficulties.
- **Frontend Development:** Due to limited time and my ongoing learning process, I could not focus much on the frontend.

Despite these challenges, **the backend is fully functional**, handling authentication, doctor searches, booking, and email notifications effectively.

## 🎯 Features
### **1. User Authentication & Role Management**
- JWT-based authentication for **Doctors** and **Patients**.
- Patients can **register, login, and manage** their appointments.
- Doctors can **register, login, and set availability** *(partially implemented in frontend)*.
- Secure password hashing using **bcrypt.js**.

### **2. Doctor Search & Profile Management**
- Patients can search for doctors using:
  - **Specialty** (e.g., Cardiologist, Dermatologist, etc.).
  - **Location** (City, State).
  - **Doctor’s Name** (partial match search).
- Each doctor has a **profile page** displaying:
  - Name, Specialty, Experience, Location, and Availability Slots *(availability integration incomplete in frontend)*.

### **3. Appointment Booking System**
- Doctors **set availability** (working hours and locations) *(backend works, frontend integration incomplete)*.
- Patients can **book an available slot**.
- **Concurrency handling** to prevent double booking.
- Patients can **cancel appointments**.
- **Email notifications** for bookings and cancellations using Nodemailer.

### **4. Web Interface (Frontend)** *(Basic implementation, needs improvement)*
- **Patient Portal:**
  - Search for doctors.
  - Book or cancel appointments *(fetching appointments needs debugging)*.
- **Doctor Dashboard:**
  - Set up consultation locations *(not fully implemented)*.
  - Define and update availability *(not fully implemented)*.
  - View upcoming appointments *(fetching data not integrated properly)*.
- **State management** using Redux or Context API *(minimal usage)*.

### **5. Deployment & Documentation**
- **Backend:** Hosted on Render
- **Frontend:** Deployed on Vercel *(basic UI, needs improvement)*

## 🛠️ Installation & Setup
### **1. Clone the Repository**
```bash
 git clone https://github.com/anushatomar13/arogo-ai-intern-assignment.git
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
  ```

### **3. Frontend Setup** *(Basic, needs improvement)*
```bash
 cd frontend
 npm install
 npm run dev
```

## 💪 API Endpoints
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
| `/api/doctors/:id/availability` | PUT | Update doctor's availability *(backend only, frontend not fully integrated)* |

### **Appointments**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/appointments` | POST | Book an appointment |
| `/api/appointments/:id` | DELETE | Cancel an appointment |
| `/api/appointments/:userId` | GET | Get patient’s appointments *(not working properly in frontend)* |

## 🌍 Sample API Requests
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
 ├─📁 backend (Node.js, Express, MongoDB)
 ├─📁 frontend (React.js, CSS) *(basic, needs more work)*
 ├─📄 README.md
```

## 📀 Video Demonstration
- **[Watch Here](https://www.loom.com/share/d450395b7e5b4645b29572c6139b03ed?sid=3d513943-1269-4207-9fd8-dd3562eda2b4)** (Link to a 5-10 min recording explaining the project)

## 🔥 Future Enhancements
- Fix frontend **appointment fetching and doctor availability issues**.
- Improve **frontend UI and responsiveness**.
- Add **real-time notifications** using WebSockets.
- Implement **doctor reviews and ratings**.

---
### 📊 Summary
This project focuses on **backend functionality**, ensuring **secure authentication, doctor search, appointment booking, and email notifications**. However, **frontend integration is incomplete** due to **time constraints** and my **ongoing learning process**. Future improvements will focus on refining the frontend and completing missing features.

**🚀 Despite challenges, the backend is fully functional and meets the core requirements!**

