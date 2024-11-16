import React, { useState, useEffect } from 'react';
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

const ManagerDashboard = () => {
  const [formData, setFormData] = useState({
    date: "",  // Date (empty for now, can be set via user input)
    departments: [
      { name: "Bar", amount: "" },
      { name: "Kitchen", amount: "" },
      { name: "Carwash", amount: "" },
      { name: "Others", amount: "" }
    ],
    paymentModes: [
      { mode: "Cash", amount: "" },
      { mode: "Mpesa", amount: "" },
      { mode: "PDQ", amount: "" }
    ],
    totalSales: "",
    totalPayments: "",
    varianceAmount: "",
    varianceDetails: [
      {
        date: "", // Variance date (empty for now)
        personName: "",
        amount: "",
        recoveryMode: "",
        explanation: ""
      }
    ],
    cashToExpenses: "",
    CashToBeBanked: "",
    allowedPayments: {
      description: "",
      amount: ""
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    // You could load default data here or fetch it from an API if needed
    // setFormData({...});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  // General input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle change for nested fields (like departments, paymentModes)
  const handleDepartmentChange = (index, field, value) => {
    const updatedDepartments = [...formData.departments];
    updatedDepartments[index][field] = value;
    setFormData(prev => ({
      ...prev,
      departments: updatedDepartments,
    }));
  };

  const handlePaymentModeChange = (index, field, value) => {
    const updatedPaymentModes = [...formData.paymentModes];
    updatedPaymentModes[index][field] = value;
    setFormData(prev => ({
      ...prev,
      paymentModes: updatedPaymentModes,
    }));
  };

  const handleVarianceChange = (index, field, value) => {
    const updatedVarianceDetails = [...formData.varianceDetails];
    updatedVarianceDetails[index][field] = value;
    setFormData(prev => ({
      ...prev,
      varianceDetails: updatedVarianceDetails,
    }));
  };

  const handleAllowedPaymentChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      allowedPayments: {
        ...prev.allowedPayments,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://sales-summary-data-entry.onrender.com/api/sales-summary', formData);
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
        text: 'Summary Sales of these date already exists.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <Paper elevation={0} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Daily Sales Dashboard
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ padding: 0,border: '2px solid #3f51b5' }}>
          {/* Date Input */}
          <Grid item xs={12} sm={6} md={3} >
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
          {/* Cash To Expenses */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ padding: 2 }}>
              <CardContent>
                <Typography variant="h6">Cash to Expenses</Typography>
                <TextField
                  label="Amount"
                  name="cashToExpenses"
                  type="number"
                  value={formData.cashToExpenses}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Cash to be banked */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ padding: 2 }}>
              <CardContent>
                <Typography variant="h6">Cash to be banked</Typography>
                <TextField
                  label="Amount"
                  name="CashToBeBanked"
                  type="number"
                  value={formData.CashToBeBanked}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ padding: 2 }}>
              <CardContent>
                <Typography variant="h6">total Payments</Typography>
                <TextField
                  label="Amount"
                  name="totalPayments"
                  type="number"
                  value={formData.totalPayments}
                  onChange={handleInputChange}
                  fullWidth

                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ padding: 2 }}>
              <CardContent>
                <Typography variant="h6">variance Amount</Typography>
                <TextField
                  label="Amount"
                  name="varianceAmount"
                  type="number"
                  value={formData.varianceAmount}
                  onChange={handleInputChange}
                  fullWidth

                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ padding: 2 }}>
              <CardContent>
                <Typography variant="h6">total Sales</Typography>
                <TextField
                  label="Amount"
                  name="totalSales"
                  type="number"
                  value={formData.totalSales}
                  onChange={handleInputChange}
                  fullWidth

                />
              </CardContent>
            </Card>
          </Grid>
          {/* Allowed Payments */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ padding: 4 }}>
              <CardContent>
                <Typography variant="h6">Allowed Payments</Typography>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.allowedPayments.description}
                  onChange={(e) => handleAllowedPaymentChange('description', e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.allowedPayments.amount}
                  onChange={(e) => handleAllowedPaymentChange('amount', e.target.value)}
                  fullWidth
                  required
                />
              </CardContent>
            </Card>
          </Grid>
          {/* Variance Details */}
          {formData.varianceDetails.map((variance, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">Variance Details</Typography>
                  <Grid container spacing={3}>
                    {/* Pair 1: Date and Person Name */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Date"
                        type="date"
                        name="date"
                        value={variance.date}
                        onChange={(e) => handleVarianceChange(index, 'date', e.target.value)}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Person Name"
                        name="personName"
                        value={variance.personName}
                        onChange={(e) => handleVarianceChange(index, 'personName', e.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>

                    {/* Pair 2: Amount and Recovery Mode */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Amount"
                        name="amount"
                        type="number"
                        value={variance.amount}
                        onChange={(e) => handleVarianceChange(index, 'amount', e.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>

                    {/* Pair 3: Explanation */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Explanation"
                        name="explanation"
                        value={variance.explanation}
                        onChange={(e) => handleVarianceChange(index, 'explanation', e.target.value)}

                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Submit Button */}
        {/* <Grid container spacing={2} justifyContent="center" sx={{ marginTop: { xs: 2, sm: 4 } }}> */}
        <br />
        <Grid item spacing={2} sx={{ marginTop: { xs: 4, sm: 8 } }}>
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
            Submit
          </Button>
        </Grid>
        {/* </Grid> */}
      </form>
      <br/>
      <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{
              padding: { xs: '8px 16px', sm: '10px 20px' },
              fontSize: { xs: '14px', sm: '16px' },
              textTransform: 'none',
            }}
          >
            Logout
          </Button>
        </Grid>
      </Grid>

    </Paper>

  );
};

export default ManagerDashboard;
