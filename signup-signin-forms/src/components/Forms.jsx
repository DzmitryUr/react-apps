import { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import styles from './Forms.module.css';

function Forms() {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className={styles.container}>
      {isSignup ? (
        <SignUpForm onSignIn={() => setIsSignup(false)} />
      ) : (
        <SignInForm onSignUp={() => setIsSignup(true)} />
      )}
    </div>
  );
}

export default Forms;
