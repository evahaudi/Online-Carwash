import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  Paper,
  MenuItem,
} from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2';



const Dashboard = () => {
  const [formData, setFormData] = useState({
    date: '',
    departments: [
      { name: 'Kitchen', amount: "" },
      { name: 'Carwash', amount: "" },
      { name: 'Others', amount: "" },
      { name: 'Bar', amount: "" },
    ],
    allowedPayments: { description: '', amount: '' },
    varianceDetails: [{ date: '', personName: '', amount: '', recoveryMode: '', explanation: '' }],
    totalSales: "",
    totalPayments: "",
    varianceAmount: "",
    paymentModes: [
      { mode: 'Cash', amount: "" },
      { mode: 'Mpesa', amount: "" },
      { mode: 'PDQ', amount: "" },
    ],
  });
  

  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally clear stored token or user data
    localStorage.removeItem('userToken');
    navigate('/login');  // Redirect to login page after logout
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDepartmentChange = (index, field, value) => {
    const updatedDepartments = [...formData.departments];
    updatedDepartments[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      departments: updatedDepartments,
    }));
  };

  const handlePaymentModeChange = (index, field, value) => {
    const updatedPaymentModes = [...formData.paymentModes];
    updatedPaymentModes[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      paymentModes: updatedPaymentModes,
    }));
  };

  const handleVarianceChange = (index, field, value) => {
    const updatedVarianceDetails = [...formData.varianceDetails];
    updatedVarianceDetails[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      varianceDetails: updatedVarianceDetails,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/daily-sales', formData);
      Swal.fire({
        title: 'Success!',
        text: 'Data submitted successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error submitting the data.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Daily Sales Dashboard
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ padding: 0 }}>  {/* Zero padding for Grid */}

          {/* Date Input */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ padding: 2 }}>
              <CardContent>
                <Typography variant="h6">Date</Typography>
                <TextField
                  label="Date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Department Details */}
          {formData.departments.map((dept, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">{dept.name} Department</Typography>
                  <TextField
                    label="Amount"
                    name="amount"
                    type="number"
                    value={dept.amount}
                    onChange={(e) => handleDepartmentChange(index, 'amount', e.target.value)}
                    fullWidth
                    required
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Payment Modes */}
          {formData.paymentModes.map((payment, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">{payment.mode} Payment</Typography>
                  <TextField
                    label="Amount"
                    name="amount"
                    type="number"
                    value={payment.amount}
                    onChange={(e) => handlePaymentModeChange(index, 'amount', e.target.value)}
                    fullWidth
                    required
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Variance Details */}
          {formData.varianceDetails.map((variance, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">Variance Details</Typography>
                  <TextField
                    label="Person Name"
                    name="personName"
                    value={variance.personName}
                    onChange={(e) => handleVarianceChange(index, 'personName', e.target.value)}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Amount"
                    name="amount"
                    type="number"
                    value={variance.amount}
                    onChange={(e) => handleVarianceChange(index, 'amount', e.target.value)}
                    fullWidth
                    required
                  />
                  <FormControl fullWidth>
                    <InputLabel>Recovery Mode</InputLabel>
                    <Select
                      value={variance.recoveryMode}
                      onChange={(e) => handleVarianceChange(index, 'recoveryMode', e.target.value)}
                      name="recoveryMode"
                    >
                      <MenuItem value="cash">Cash</MenuItem>
                      <MenuItem value="salary deduction">Salary Deduction</MenuItem>
                      <MenuItem value="item collateral">Item Collateral</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Explanation"
                    name="explanation"
                    value={variance.explanation}
                    onChange={(e) => handleVarianceChange(index, 'explanation', e.target.value)}
                    fullWidth
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Allowed Payments */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ padding: 2 }}>
              <CardContent>
                <Typography variant="h6">Allowed Payments</Typography>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.allowedPayments.description}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    allowedPayments: { ...prev.allowedPayments, description: e.target.value }
                  }))}
                  fullWidth
                  required
                />
                <TextField
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.allowedPayments.amount}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    allowedPayments: { ...prev.allowedPayments, amount: e.target.value }
                  }))}
                  fullWidth
                  required
                />
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        {/* Submit Button */}
        <Grid container justifyContent="center" sx={{ marginTop: { xs: 2, sm: 8, md: 4 } }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              padding: { xs: '8px 16px', sm: '10px 20px' }, 
              fontSize: { xs: '14px', sm: '16px' },        
              textTransform: 'none', 
            }}
          >
            SAVE
          </Button>
        </Grid>
        <Grid container justifyContent="center" sx={{ marginTop: { xs: 2, sm: 8, md: 4 } }} onClick={handleLogout}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              padding: { xs: '8px 16px', sm: '10px 20px' }, 
              fontSize: { xs: '14px', sm: '16px' },        
              textTransform: 'none', 
            }}
          >
            LOGOUT
          </Button>
        </Grid>

      </form>
    </Paper>
  );
};

export default Dashboard;
