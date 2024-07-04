import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { useState } from 'react';

import styles from './Forms.module.css';

function Forms() {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className={styles.container}>
      {isSignup ? (
        <SignUpForm onSignIn={() => setIsSignup(false)} />
      ) : (
        <SignInForm onSugnUp={() => setIsSignup(true)} />
      )}
    </div>
  );
}

export default Forms;
