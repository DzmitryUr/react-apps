import { useState } from 'react';

import './SignUpForm.css';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUpForm() {
  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    if (!formData.password) formErrors.password = 'Password is required';
    else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      console.log('Form submitted successfully:', formData);
      // Handle form submission (e.g., send data to server)
      setFormData({ ...initialState });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className='signup-form'>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username*</label>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <span className='error'>{errors.username}</span>}
        </div>
        <div className='form-group'>
          <label>Email*</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className='error'>{errors.email}</span>}
        </div>
        <div className='form-group'>
          <label>Password*</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className='error'>{errors.password}</span>}
        </div>
        <div className='form-group'>
          <label>Confirm Password*</label>
          <input
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <span className='error'>{errors.confirmPassword}</span>
          )}
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
