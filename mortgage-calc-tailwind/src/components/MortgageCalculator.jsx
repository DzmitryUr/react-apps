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

  const onSubmit = (formData) => {
    console.log(formData);
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
      <h2 className='m-4 font-bold'>Mortgage Calculator</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='mb-8'>
        <div className='flex flex-col mb-4'>
          <label className='font-bold text-left'>Home Price:</label>
          <input
            type='number'
            {...register('amount', { required: 'Home price is required.' })}
            className='w-full p-2 border border-blue-200 rounded-lg text-lg'
          />
          {errors.amount && (
            <span className='text-red-500 text-sm'>
              {errors.amount.message}
            </span>
          )}
        </div>
        <div className='flex flex-col mb-4'>
          <label className='font-bold text-left'>Down Payment:</label>
          <input
            type='number'
            {...register('downPayment', {
              required: 'Down payment is required.',
            })}
            className='w-full p-2 border border-blue-200 rounded-lg text-lg'
          />
          {errors.downPayment && (
            <span className='text-red-500 text-sm'>
              {errors.downPayment.message}
            </span>
          )}
        </div>
        <div className='flex flex-col mb-4'>
          <label className='font-bold text-left'>Interest Rate (%):</label>
          <input
            type='number'
            {...register('interestRate', {
              required: 'Interest rate is required.',
            })}
            className='w-full p-2 border border-blue-200 rounded-lg text-lg'
          />
          {errors.interestRate && (
            <span className='text-red-500 text-sm'>
              {errors.interestRate.message}
            </span>
          )}
        </div>
        <div className='flex flex-col mb-8'>
          <label className='font-bold text-left'>Loan Term (years):</label>
          <input
            type='number'
            {...register('loanTerm', { required: 'Loan term is required.' })}
            className='w-full p-2 border border-blue-200 rounded-lg text-lg'
          />
          {errors.loanTerm && (
            <span className='text-red-500 text-sm'>
              {errors.loanTerm.message}
            </span>
          )}
        </div>
        <button
          type='submit'
          className='w-full px-8 py-3 bg-blue-700 text-white rounded-lg cursor-pointer text-lg hover:bg-blue-800'
        >
          Calculate
        </button>
      </form>
      {payment && (
        <div className='mb-2 text-xl'>
          <h3>Monthly Payment: {payment}</h3>
          <h3>Total Loan Payment: {total}</h3>
          <h3>Total Interest Payment: {interes}</h3>
        </div>
      )}
    </div>
  );
}

export default MortgageCalculator;
