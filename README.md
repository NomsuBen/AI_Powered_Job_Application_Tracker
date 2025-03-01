# **AI-Powered Job Application Tracker**  
### 🚀 *Developed by Benjamin Olamilekan Olaniran*  

---

## **📌 Project Overview**
The **AI-Powered Job Application Tracker** is a **full-stack web application** that enables users to:
- ✅ **Track job applications** (CRUD operations)
- ✅ **Receive AI-generated resume feedback**
- ✅ **Get personalized job recommendations**
- ✅ **Manage authentication with JWT (JSON Web Tokens)**

The application is built using:
- **Frontend:** Next.js (React) + Tailwind CSS
- **Backend:** Node.js (Express) + MongoDB
- **Authentication:** JWT-based login & registration
- **State Management:** React Hooks (`useState`, `useEffect`)
- **API Handling:** RESTful API integration

---

## **📌 Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/NomsuBen/ai-job-tracker.git
cd ai-job-tracker
```

### **2️⃣ Backend Setup**
#### **Install Dependencies**
```sh
cd Backend_Stack
npm install
```

#### **Set Up Environment Variables**
Create a `.env` file in the `Backend_Stack` directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

#### **Start the Backend Server**
```sh
npm run dev
```
Your backend will be running at:  
👉 **`http://localhost:5000`**

---

### **3️⃣ Frontend Setup**
#### **Install Dependencies**
```sh
cd ../Frontend_Stack
npm install
```

#### **Start the Frontend Server**
```sh
npm run dev
```
Your frontend will be running at:  
👉 **`http://localhost:3000`**

---

## **📌 API Documentation**
### **🔑 Authentication Routes**
| Method | Endpoint            | Description             | Body Parameters |
|--------|---------------------|-------------------------|----------------|
| `POST` | `/api/auth/register` | Register a new user | `{ email, password }` |
| `POST` | `/api/auth/login` | Log in user & get token | `{ email, password }` |

### **📋 Job Applications Routes**
| Method | Endpoint               | Description                    | Headers | Body Parameters |
|--------|------------------------|--------------------------------|---------|----------------|
| `GET`  | `/api/applications`      | Fetch all job applications  | `Authorization: Bearer TOKEN` | |
| `POST` | `/api/applications`      | Create a new job application | `Authorization: Bearer TOKEN` | `{ jobTitle, companyName, applicationStatus, notes }` |
| `PUT`  | `/api/applications/:id`  | Update an existing application | `Authorization: Bearer TOKEN` | `{ jobTitle, companyName, applicationStatus, notes }` |
| `DELETE` | `/api/applications/:id` | Delete a job application | `Authorization: Bearer TOKEN` | |

### **🤖 AI Resume Feedback Route**
| Method | Endpoint               | Description                    | Headers | Body Parameters |
|--------|------------------------|--------------------------------|---------|----------------|
| `POST` | `/api/resume-feedback` | Get AI-generated resume feedback | `Authorization: Bearer TOKEN` | `{ resume: "your resume text" }` |

---

## **📌 Features & Functionality**
### ✅ **User Authentication (JWT)**
- Users can **register, log in, and log out**.
- Session management is handled **securely with JWT**.

### ✅ **Job Application Tracking**
- Users can **add, edit, and delete job applications**.
- Statuses: **Applied, Interview Scheduled, Offer Received, Rejected**.
- Users can **filter and search** applications.

### ✅ **AI Resume Feedback**
- Users can submit their **resume text** and receive **mock AI feedback**.

### ✅ **Job Recommendations**
- Users receive **mock job recommendations** based on their skills.

---

## **📌 Project Structure**
```
/ai-job-tracker
├── Backend_Stack
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── .env
│   ├── package.json
│   ├── README.md
├── Frontend_Stack
│   ├── components
│   ├── pages
│   ├── styles
│   ├── package.json
│   ├── README.md
```

---

## **📌 Future Improvements**
✅ **Integrate a real AI-based resume feedback system**  
✅ **Connect with real job board APIs** (LinkedIn, Indeed, etc.)  
✅ **Deploy the app on Vercel & Heroku**  

---

## **📌 Contributing**
**Want to improve this project?**  
1️⃣ **Fork the repository**  
2️⃣ **Create a feature branch**  
3️⃣ **Submit a pull request**  

---

## **📌 Contact**
👤 **Benjamin Olamilekan Olaniran**  
📧 Email: [olaniranbenjamin@gmail.com](mailto:olaniranbenjamin@gmail.com)  
📌 GitHub: [NomsuBen](https://github.com/NomsuBen)  

---

🔥 **Enjoy tracking your job applications efficiently!** 🚀  
Let me know if you have any questions or need modifications. 😊