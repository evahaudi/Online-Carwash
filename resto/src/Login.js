import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, Link, useMediaQuery, useTheme } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Swal from 'sweetalert2';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook to navigate after successful login

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://login-y0ha.onrender.com/login', {
        email: formData.email,
        password: formData.password,
      });

      // If login is successful, redirect to Dashboard page
      if (response.status === 200) {
        localStorage.setItem('userToken', response.data.token); // Store the token if needed
        navigate('/managerdashboard'); // Redirect to the dashboard page after successful login
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const paperWidth = isSmallScreen ? '300px' : '330px';

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
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
          <Typography variant="h5" align="center" style={{ marginBottom: '1rem' }}>
            Login
          </Typography>
          {error && (
            <Typography color="error" variant="body2" align="center" style={{ marginBottom: '1rem' }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ padding: '10px' }}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Grid>
            </Grid>
          </form>
          <Grid container justifyContent="center" style={{ marginTop: '1rem' }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link href="/" style={{ textDecoration: 'none' }}>
                Sign Up
              </Link>
            </Typography>
          </Grid>
          <Grid container justifyContent="center" style={{ marginTop: '0.5rem' }}>
            <Typography variant="body2">
              <Link href="/forgotpwd" style={{ textDecoration: 'none' }}>
                Forgot your password?
              </Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
