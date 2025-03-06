# Doctor Search & Appointment Booking System

## 📌 Project Overview
The **Doctor Search & Appointment Booking System** is a full-stack web application built using the **MERN** stack for Arogo AI’s **Clinic360** platform. It allows:
- **Patients** to search for doctors by name, specialty, or location and book appointments.
- **Doctors** to set their availability and manage appointments.
- **Authentication** for doctors and patients with secure login and role-based access.

---
## 🚀 Live Demo
- **Backend:** [Deployed Link](https://arogo-ai-intern-assignment.onrender.com/)
- **Frontend API:** [Deployed Link](https://arogo-ai-intern-assignment-frontend.vercel.app/) *(Limited functionality due to incomplete frontend implementation)*

---
## 🛠️ Tech Stack
### **Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt.js for password hashing
- Nodemailer for email notifications

### **Frontend:** *(Incomplete Implementation)*
- React.js (Vite)
- Vanilla CSS
- Redux / Context API *(Planned but not fully implemented)*

---
## 🎯 Backend Implementation (Fully Functional)

The backend is **fully implemented and tested**. All API endpoints are functional and work correctly when tested via **Postman**.

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

### **4. API Endpoints** *(All tested and working via Postman)*


---
## 🎨 Frontend Implementation *(Incomplete)*
### **Challenges Faced:**
- Due to time constraints and ongoing learning, the frontend implementation is incomplete.
- While the UI structure is set up, **integration with the backend is not fully implemented**.
- **Fetching appointments for users and doctors** and **allowing doctors to set availability** is not fully functional yet.
- API calls are structured, but frontend logic to handle responses is incomplete.

### **Current Frontend Features:**
- **Basic UI:** A homepage with navigation and doctor search fields.
- **Doctor Search Page:** Displays list of doctors (backend integrated).
- **Appointments booking** Users can book appointments (backend integrated).
- **Login & Registration Pages:** UI implemented, but token storage/handling is incomplete.
- **Dashboard Pages:** Placeholder UI for Patient and Doctor Dashboards.

### **What Still Needs to be Done?**
- **Connect frontend with backend APIs** for authentication, doctor search, and appointment management.
- **Implement state management** using Redux or Context API.
- **Handle API responses properly** to update UI dynamically.

---
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
### **3. Frontend Setup** *(UI only, API integration pending)*
```bash
 cd frontend
 npm install
 npm run dev
```

---
## 📜 Folder Structure
```
📎 doctor-booking-system
 └── 📁 backend (Fully Functional API)
 └── 📁 frontend (Incomplete UI, Needs complete API Integration)
 └── 📄 README.md
```

---
## 📺 Video Demonstration
- **[Watch Here](https://www.loom.com/share/d450395b7e5b4645b29572c6139b03ed?sid=3d513943-1269-4207-9fd8-dd3562eda2b4)** *(Explains backend implementation & challenges faced in frontend)*

---
## 🔥 Future Enhancements
- **Complete frontend integration** for API calls.
- Add **real-time notifications** using WebSockets.
- Implement **doctor reviews and ratings**.
- Enhance UI with more **interactive elements**.

---
## 💪 Final Thoughts
This project showcases a **fully functional backend** with a **partially implemented frontend**. Due to limited time and ongoing learning, frontend integration is incomplete. However, all backend functionalities work properly via API calls in Postman. Future improvements will focus on **frontend completion and seamless API integration**.
