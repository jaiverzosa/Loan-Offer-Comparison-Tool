# Loan Offer Comparison Tool

A full-stack project that helps users compare different loan offers based on the loan amount and loan term they enter.

## 📌 Features

- **User-friendly form with validation**:
  - First name (letters only)
  - Email address (valid email format)
  - Loan amount (minimum $2000)
  - Loan term (1–7 years)
  - Real-time inline error messages
  - Submit button disabled until form is valid
- **Backend API** that generates fake loan offers with:
  - Lender name
  - Interest rate
  - Fees
  - Calculated monthly repayment

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript
- **Backend:** Node.js (Express) + TypeScript
- **Other:** CORS, Fetch API

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jaiverzosa/Loan-Offer-Comparison-Tool.git
   cd Loan-Offer-Comparison-Tool
   Setup backend
   ```

bash
Copy code
cd server
npm install
npm run dev
Server runs at: http://localhost:5000

Setup frontend

bash
Copy code
cd client
npm install
npm start
Frontend runs at: http://localhost:3000

🚀 Usage
Open the app in your browser: http://localhost:3000

Fill in your details (first name, email, loan amount, and loan term).

Submit the form.

See loan offers displayed in a table.

📩 Notes
This project is for demo purposes — loan offers are fake/generated.

Built as an assignment to demonstrate frontend validation, backend API creation, and full-stack integration.
