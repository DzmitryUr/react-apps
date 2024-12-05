import { useState } from 'react';
import './Counter.css';

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h2>#1 Counter App</h2>
      <div className='counter'>
        <button
          className='decrement'
          onClick={() => setCount((prevCount) => prevCount - 1)}
        >
          -
        </button>
        <span className='count'>{count}</span>
        <button
          className='increment'
          onClick={() => setCount((prevCount) => prevCount + 1)}
        >
          +
        </button>
      </div>
    </>
  );
}
