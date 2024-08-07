import { useState } from 'react';

import FormGroup from './FormGroup';
import styles from './Forms.module.css';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
function SignUpForm({ onSignIn }) {
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
    if (!formData.username) formErrors.username = 'Username is required';
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

    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
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
      onSignIn();
    } else {
      setErrors(formErrors);
    }
  };
  return (
    <>
      <h2>Create Account</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormGroup
          label='Username'
          type='text'
          name='username'
          value={formData.username}
          handleChange={handleChange}
          error={errors.username}
        />
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
        <FormGroup
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          value={formData.confirmPassword}
          handleChange={handleChange}
          error={errors.confirmPassword}
        />
        <button className={styles.button} type='submit'>
          Sign Up
        </button>
      </form>

      <div>
        Already have an account?{' '}
        <span className={styles.span} onClick={onSignIn}>
          Login Now
        </span>
      </div>
    </>
  );
}

export default SignUpForm;
