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
2. **Setup Backend**
- cd server
- npm install
- npm run dev
- Server runs at: http://localhost:5000

3. **Setup frontend**
- cd client
- npm install
- npm start
- Frontend runs at: http://localhost:3000

🚀 Usage
- Open the app in your browser: http://localhost:3000
- Fill in your details (first name, email, loan amount, and loan term).
- Submit the form.
- See loan offers displayed in a table.

📩 Notes
This project is for demo purposes — loan offers are fake/generated.

📷 Screenshots
<img width="1358" height="902" alt="g_web1" src="https://github.com/user-attachments/assets/880674bd-7016-4a20-92af-dc447bbe28a6" />
<img width="1342" height="898" alt="g_web2" src="https://github.com/user-attachments/assets/6bbc360a-06e3-4ff4-be65-9aac3594297d" />
