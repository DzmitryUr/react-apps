import React from 'react';
import { useForm } from 'react-hook-form';

function MortgageCalculator() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [payment, setPayment] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  const [interes, setInterest] = React.useState(null);

  const fields = [
    {
      name: 'amount',
      label: 'Home Price ($)',
      validation: { required: 'Home price is required.' },
    },
    {
      name: 'downPayment',
      label: 'Down Payment ($)',
      validation: { required: 'Down payment is required.' },
    },
    {
      name: 'interestRate',
      label: 'Interest Rate (%)',
      validation: { required: 'Interest rate is required.' },
    },
    {
      name: 'loanTerm',
      label: 'Loan Term (years)',
      validation: { required: 'Loan term is required.' },
    },
  ];

  const onSubmit = (formData) => {
    calculateMonthlyPayment(formData);
  };

  const calculateMonthlyPayment = ({
    amount,
    downPayment,
    interestRate,
    loanTerm,
  }) => {
    const loanAmount =
      parseFloat(amount) - (downPayment ? parseFloat(downPayment) : 0);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;
    const numerator = loanAmount * r * Math.pow(1 + r, n);
    const denumerator = Math.pow(1 + r, n) - 1;
    const monthlyPayment = (numerator / denumerator).toFixed(2);

    setPayment(monthlyPayment);
    const totalPayable = (monthlyPayment * n).toFixed(2);
    setTotal(totalPayable);
    const totalInterest = (totalPayable - loanAmount).toFixed(2);
    setInterest(totalInterest);
  };

  return (
    <div className='min-w-[20rem] md:min-w-[30rem] max-w-[80rem] bg-white p-4 shadow-lg rounded-md text-xl'>
      <h2 className='mb-8'>Mortgage Calculator</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='mb-8'>
        {fields.map(({ name, label, validation }) => (
          <div key={name} className='flex flex-col mb-4'>
            <label className='font-bold text-left'>{label}</label>
            <input
              type='number'
              {...register(name, validation)}
              className='w-full p-2 border border-blue-200 rounded-lg text-lg'
            />
            {errors[name] && (
              <span className='text-red-500'>{errors[name].message}</span>
            )}
          </div>
        ))}
        <button
          type='submit'
          className='w-full px-8 py-2 bg-indigo-700 text-white rounded-lg cursor-pointer hover:bg-indigo-800'
        >
          Calculate
        </button>
      </form>
      {payment && (
        <div>
          <h3>Monthly Payment: {payment}</h3>
          <h3>Total Loan Payment: {total}</h3>
          <h3>Total Interest Payment: {interes}</h3>
        </div>
      )}
    </div>
  );
}

export default MortgageCalculator;
