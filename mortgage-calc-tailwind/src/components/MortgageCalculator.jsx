import { useState } from 'react';
import { useForm } from 'react-hook-form';

const fields = [
  {
    name: 'amount',
    label: 'Home Price ($)*',
    validation: { required: 'Home Price is required' },
  },
  {
    name: 'downPayment',
    label: 'Down Payment ($)*',
    validation: { required: 'Down Payment is required' },
  },
  {
    name: 'interestRate',
    label: 'Interest Rate (%)*',
    validation: { required: 'Interest Rate is required' },
    step: '.01',
  },
  {
    name: 'loanTerm',
    label: 'Loan Term (years)*',
    validation: { required: 'Loan Term is required' },
  },
];

export default function MortgageCalculator() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [payment, setPayment] = useState(null);
  const [total, setTotal] = useState(null);
  const [interes, setInterest] = useState(null);

  const onSubmit = (data) => calculateMonthlyPayment(data);

  const calculateMonthlyPayment = (formData) => {
    const { amount, downPayment, interestRate, loanTerm } = formData;

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
      <form onSubmit={handleSubmit(onSubmit)} className='mb-4'>
        {fields.map(({ name, label, validation, step }) => (
          <div key={name} className='flex flex-col mb-4'>
            <label className='font-bold text-left'>{label}</label>

            <input
              type='number'
              step={step ? step : '1'}
              {...register(name, validation)}
              className='w-full p-2 border border-blue-200 rounded-lg'
            />
            {errors[name] && (
              <span className='text-red-500 text-sm'>
                {errors[name].message}
              </span>
            )}
          </div>
        ))}
        <button
          type='submit'
          className='w-full px-8 py-3 bg-blue-700 text-white rounded-lg cursor-pointer hover:bg-blue-900'
        >
          Calculate
        </button>
      </form>
      {payment && (
        <div className='mb-4'>
          <h3>Monthly Payment: {payment}</h3>
          <h3>Total Loan Payment: {total}</h3>
          <h3>Total Interest Payment: {interes}</h3>
        </div>
      )}
    </div>
  );
}
