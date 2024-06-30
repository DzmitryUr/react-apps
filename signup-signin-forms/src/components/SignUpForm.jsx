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
            required
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className='error'>{errors.username}</span>}
        </div>
        <div className='form-group'>
          <label>Email*</label>
          <input
            type='email'
            name='email'
            required
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className='error'>{errors.email}</span>}
        </div>
        <div className='form-group'>
          <label>Password*</label>
          <input
            type='password'
            name='password'
            required
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className='error'>{errors.password}</span>}
        </div>
        <div className='form-group'>
          <label>Confirm Password*</label>
          <input
            type='password'
            name='confirmPassword'
            required
            value={formData.confirmPassword}
            onChange={handleChange}
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
