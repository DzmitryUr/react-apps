import { useState } from 'react';

import './RollDice.css';

import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from 'react-icons/fa';

const sides = [
  <FaDiceOne />,
  <FaDiceTwo />,
  <FaDiceThree />,
  <FaDiceFour />,
  <FaDiceFive />,
  <FaDiceSix />,
];

function DiceRolling() {
  const [die1, setDie1] = useState(sides[0]);
  const [die2, setDie2] = useState(sides[0]);
  const [isRolling, setIsRolling] = useState();

  const roll = () => {
    setIsRolling(true);

    // Start timer of one sec when rolling start
    setTimeout(() => {
      // Set rolling to false again when time over
      setIsRolling(false);
      setDie1(sides[Math.floor(Math.random() * sides.length)]);
      setDie2(sides[Math.floor(Math.random() * sides.length)]);
    }, 1000);
  };

  const dieClassname = `die ${isRolling ? 'die-shaking' : ''}`;

  return (
    <div className='dice-container'>
      <h2>Dice Rolling</h2>
      <div className='dice'>
        <div className={dieClassname}>{die1}</div>
        <div className={dieClassname}>{die2}</div>
      </div>
      <button disabled={isRolling} onClick={roll}>
        {isRolling ? 'Rolling' : 'Roll Dice!'}
      </button>
    </div>
  );
}

export default DiceRolling;
