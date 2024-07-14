import { useState } from 'react';

import './MortgageCalculator.css';

const initialState = {
  amount: '',
  downPayment: '',
  interestRate: '',
  loanTerm: '',
};

function MortgageCalculator() {
  const [formData, setFormData] = useState(initialState);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayable, setTotalPayable] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateMonthlyPayment();
  };

  const calculateMonthlyPayment = () => {
    const { amount, downPayment, interestRate, loanTerm } = formData;
    const loanAmount =
      parseFloat(amount) - (downPayment ? parseFloat(downPayment) : 0);

    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    const numerator = loanAmount * r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;

    const monthlyPayment = (numerator / denominator).toFixed(2);
    setMonthlyPayment(monthlyPayment);

    const totalPayable = (monthlyPayment * n).toFixed(2);
    setTotalPayable(totalPayable);

    const totalInterest = (totalPayable - loanAmount).toFixed(2);
    setTotalInterest(totalInterest);
  };

  return (
    <div className='mortgage-container'>
      <h2>Mortgage Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Home Price ($):</label>
          <input
            type='number'
            name='amount'
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Down Payment ($):</label>
          <input
            type='number'
            name='downPayment'
            value={formData.downPayment}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Interest Rate (%):*</label>
          <input
            type='number'
            name='interestRate'
            value={formData.interestRate}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Loan Term (years):</label>
          <input
            type='number'
            name='loanTerm'
            value={formData.loanTerm}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit'>Calculate</button>
        {monthlyPayment && (
          <div className='res'>
            <h3>Monthly Payment: $ {monthlyPayment}</h3>
            <h3>Total Loan Payment: $ {totalPayable}</h3>
            <h3>Total Interest Amount: $ {totalInterest}</h3>
          </div>
        )}
      </form>
    </div>
  );
}

export default MortgageCalculator;
