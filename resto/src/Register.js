import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, Link, useMediaQuery, useTheme } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Swal from 'sweetalert2';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '', // Add phone number to match the API payload
    username: '', // Add username to match the API payload
  });

  const navigate = useNavigate(); // Hook to navigate after successful registration

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      phone: formData.phone,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
  
    try {
      const response = await axios.post('https://login-y0ha.onrender.com/sign-up', payload);
  
      // Log the response for debugging
      console.log('Response Data:', response.data);
  
      // Check if the response indicates success via the message
      if (response.data.message === 'User signed up successfully') {
        console.log('Redirecting to login...');
        navigate('/login', { replace: true });
      } else {
        console.error('Registration failed:', response.data);
        alert(response.data.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Swal.fire({
        title: 'Error!',
        text: 'phone number already exist',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const paperWidth = isSmallScreen ? '300px' : '330px';

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6} lg={4} container justifyContent="center">
        <Paper
          elevation={3}
          style={{
            padding: 20,
            marginTop: theme.spacing(8),
            [theme.breakpoints.up('sm')]: { marginTop: theme.spacing(12) },
            width: paperWidth,
            backgroundColor: '#F3F6F6',
            borderRadius: 10,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Email</Typography>
                <TextField
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Password</Typography>
                <TextField
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Phone</Typography>
                <TextField
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Username</Typography>
                <TextField
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" size="small" fullWidth>
                  Sign Up
                </Button>
                <br />
                <br />
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Already have an account?{' '}
                    <Link href="/login">
                      Login here
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  <Link href="/forgotpwd">
                    Forgot your password?
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
