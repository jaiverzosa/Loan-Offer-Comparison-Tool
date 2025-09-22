import React, { useState } from "react";

// Type for backend loan offer response
type LoanOffer = {
  lenderName: string;
  monthlyRepayment: number;
  interestRate: number;
  fees: string;
};

function LoanOfferComparison() {
  // ---------------- Form State ----------------
  const [formData, setFormData] = useState({
    firstName: "",
    emailAddress: "",
    loanAmount: "",
    loanTerm: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [offers, setOffers] = useState<LoanOffer[]>([]);

  // ---------------- Validation ----------------
  const validateField = (field: string, value: any): string => {
    if (field === "firstName") {
      if (!value.trim()) return "First name is required.";

      // Regex: only letters (a–z, A–Z), spaces, or hyphens allowed
      const nameRegex = /^[A-Za-z\s-]+$/;
      if (!nameRegex.test(value)) {
        return "First name must only contain letters.";
      }
    }

    if (field === "emailAddress") {
      if (!value) return "Email address is required.";
      if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email.";
    }

    if (field === "loanAmount") {
      if (value === "" || value === null) return "Loan amount is required.";
      const num = Number(value); //Always convert to number
      if (isNaN(num)) return "Enter a valid loan amount.";
      if (num < 2000) return "Loan amount must be at least $2000.";
    }

    if (field === "loanTerm") {
      if (value === "" || value === null) return "Loan term is required.";
      const num = Number(value); //Always convert to number
      if (isNaN(num)) return "Enter a valid loan term.";
      if (num < 1 || num > 7) return "Loan term must be between 1 and 7 years.";
    }

    return "";
  };

  const validateAllFields = () => {
    const newErrors: { [key: string]: string } = {};
    for (const field in formData) {
      const error = validateField(field, (formData as any)[field]);
      if (error) newErrors[field] = error;
    }
    return newErrors;
  };

  // ---------------- Handlers ----------------
  const handleChange = (field: string, value: any) => {
    // Store raw input for validation — don’t strip errors too early
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));

    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleBlur = (field: string, value: any) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      emailAddress: "",
      loanAmount: "",
      loanTerm: "",
    });
    setErrors({});
    setTouched({});
  };

  // ---------------- Submit ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateAllFields();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({
        firstName: true,
        emailAddress: true,
        loanAmount: true,
        loanTerm: true,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          loanAmount: Number(formData.loanAmount),
          loanTerm: Number(formData.loanTerm),
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch offers");
      const data: LoanOffer[] = await response.json();
      setOffers(data); // Display offers
      resetForm(); // Reset form
    } catch (error) {
      console.error(error);
      alert("Something went wrong, please try again.");
    }
  };

  // Disable submit until all fields are valid (Requirement 4)
  const isFormValid =
    Object.values(errors).every((err) => !err) &&
    formData.firstName &&
    formData.emailAddress &&
    formData.loanAmount &&
    formData.loanTerm;

  // ---------------- UI ----------------
  return (
    <div className="overall_container">
      <header>
        <h1>LOAN OFFER</h1>
        <p>COMPARISON TOOL</p>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          {/* First Name Input */}
          <div>
            <label>FIRST NAME*</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              onBlur={(e) => handleBlur("firstName", e.target.value)}
            />
            {touched.firstName && errors.firstName && (
              <span className="errorText">{errors.firstName}</span> // Inline error
            )}
          </div>

          {/* Email Address Input */}
          <div>
            <label>EMAIL ADDRESS*</label>
            <input
              type="email"
              value={formData.emailAddress}
              onChange={(e) => handleChange("emailAddress", e.target.value)}
              onBlur={(e) => handleBlur("emailAddress", e.target.value)}
            />
            {touched.emailAddress && errors.emailAddress && (
              <span className="errorText">{errors.emailAddress}</span>
            )}
          </div>

          {/* Loan Amount Input */}
          <div>
            <label>LOAN AMOUNT ($)*</label>
            <input
              type="number"
              placeholder="At least $2000"
              value={formData.loanAmount}
              onChange={(e) => handleChange("loanAmount", e.target.value)}
              onBlur={(e) => handleBlur("loanAmount", e.target.value)}
            />
            {touched.loanAmount && errors.loanAmount && (
              <span className="errorText">{errors.loanAmount}</span>
            )}
          </div>

          {/* Loan Term Input */}
          <div>
            <label>LOAN TERM*</label>
            <input
              type="number"
              placeholder="1-7 years"
              value={formData.loanTerm}
              onChange={(e) => handleChange("loanTerm", e.target.value)}
              onBlur={(e) => handleBlur("loanTerm", e.target.value)}
            />
            {touched.loanTerm && errors.loanTerm && (
              <span className="errorText">{errors.loanTerm}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="submitButton"
            type="submit"
            disabled={!isFormValid}
          >
            Submit
          </button>
        </form>

        {/* Display Loan Offers*/}
        {offers.length > 0 && (
          <div className="offersContainer">
            <h3>LOAN OFFERS</h3>
            <table className="offersTable">
              <thead>
                <tr>
                  <th>Lender</th>
                  <th>Monthly Repayment</th>
                  <th>Interest Rate</th>
                  <th>Fees</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer, idx) => (
                  <tr key={idx}>
                    <td>{offer.lenderName}</td>
                    <td>${offer.monthlyRepayment.toFixed(2)}</td>
                    <td>{offer.interestRate}%</td>
                    <td>{offer.fees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default LoanOfferComparison;
