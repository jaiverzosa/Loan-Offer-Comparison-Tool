import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// ---------------- Middleware ----------------
app.use(cors());
app.use(express.json());

// ---------------- Test Route ----------------
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript backend!");
});

// ---------------- Loan Offers Route ----------------
app.post("/api/offers", (req: Request, res: Response) => {
  const { firstName, emailAddress, loanAmount, loanTerm } = req.body;

  // ---------------- Input Validation ----------------
  if (!firstName || !emailAddress || !loanAmount || !loanTerm) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // ---------------- Generate Fake Loan Offers ----------------
  const offers = [
    {
      lenderName: "Lender A",
      interestRate: 5.5,
      fees: "No processing fees",
      // Frontend displays monthlyRepayment from this field
      monthlyRepayment: calculateMonthlyPayment(loanAmount, 5.5, loanTerm),
    },
    {
      lenderName: "Lender B",
      interestRate: 5.2,
      fees: "$20 application fee",
      monthlyRepayment: calculateMonthlyPayment(loanAmount, 5.2, loanTerm),
    },
    {
      lenderName: "Lender C",
      interestRate: 6.0,
      fees: "No hidden charges",
      monthlyRepayment: calculateMonthlyPayment(loanAmount, 6.0, loanTerm),
    },
  ];

  res.json(offers);
});

// ---------------- Helper Function ----------------
// Calculate monthly loan repayment using amortization formula
function calculateMonthlyPayment(
  principal: number,
  annualInterestRate: number,
  loanTermInYears: number
): number {
  const monthlyInterestRate = annualInterestRate / 100 / 12; // Convert annual % to monthly decimal
  const numberOfPayments = loanTermInYears * 12; // Total monthly payments

  // If interest is 0%, just divide principal by number of payments
  if (monthlyInterestRate === 0) {
    return principal / numberOfPayments;
  }

  // Standard amortization formula
  const monthlyPayment =
    (principal *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return parseFloat(monthlyPayment.toFixed(2)); // Round to 2 decimals
}

// ---------------- Start Server ----------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`); 
});
