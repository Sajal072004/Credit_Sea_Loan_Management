# Loan Management System

## 🚀 Overview
The Loan Management System is a full-stack web application that enables users to apply for loans, while administrators and verifiers can manage and review applications. The system incorporates role-based authentication, ensuring secure access to different dashboards based on user roles.

## 🛠️ Tech Stack
- **Frontend**: Next.js, Tailwind CSS, ShadCN UI, React Chart.js
- **Backend**: Node.js, Express.js, PostgreSQL (Prisma ORM)
- **Authentication**: JWT-based authentication
- **Deployment**: Docker, Kubernetes (GKE), Google Cloud Platform

## ✨ Features
### 🔹 User Features
- Loan application form with validation
- Loan history tracking and status updates
- Secure authentication and authorization

### 🔹 Admin Features
- View and manage all loan applications
- Approve or reject loan requests
- Dashboard with key statistics

### 🔹 Verifier Features
- Verify applicant details and approve applications
- Access assigned loan applications

## 🎨 UI Overview
- Responsive and mobile-friendly design
- Interactive charts displaying loan trends
- Clear role-based navigation

## 🛠️ Installation & Setup
### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/loan-management-system.git
cd loan-management-system
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Add required environment variables
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env  # Add NEXT_PUBLIC_API_URL
npm run dev
```


## 🤝 Contributing
1. Fork the repository
2. Create a new branch (`feature-new`)
3. Commit your changes
4. Push to your branch and submit a pull request



---

> Built with ❤️ by **Sajal Namdeo**

