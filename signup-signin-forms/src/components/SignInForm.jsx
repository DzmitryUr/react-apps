import { useState } from 'react';
import FormGroup from './FormGroup';
import styles from './Forms.module.css';
import signInstyles from './SignInForm.module.css';

const initialState = {
  email: '',
  password: '',
};
function SignInForm({ onSignUp }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      formErrors.password = 'Password is requierd';
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }

    return formErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      console.log('Form is ready for submitting', formData);
      //Handle form submittion (send request to server)
      setFormData({ ...initialState });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };
  return (
    <>
      <h2>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormGroup
          label='Email'
          type='email'
          name='email'
          value={formData.email}
          handleChange={handleChange}
          error={errors.email}
        />
        <FormGroup
          label='Password'
          type='password'
          name='password'
          value={formData.password}
          handleChange={handleChange}
          error={errors.password}
        />
        <div className={signInstyles.text}>
          <span>
            <input type='checkbox' />
            Remember me
          </span>
          <span className={styles.span}>Forgot Password?</span>
        </div>
        <button className={styles.button} type='submit'>
          Sign In
        </button>
      </form>

      <div className={styles.footer}>
        Do not have an account?
        <span className={styles.span} onClick={onSignUp}>
          SignUp Now
        </span>
      </div>
    </>
  );
}

export default SignInForm;
