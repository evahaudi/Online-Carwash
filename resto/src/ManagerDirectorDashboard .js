import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Paper,
  Container,
} from "@material-ui/core";
import axios from "axios";

const ManagerDirectorDashboard = () => {
  const [salesSummary, setSalesSummary] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // Default date

  // Function to fetch data for a specific date
  const fetchSalesSummary = (date) => {
    axios
      .get(`https://sales-summary-data-entry.onrender.com/api/sales-summary?date=${date}`)
      .then((response) => {
        setSalesSummary(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching sales summary:", error);
        setSalesSummary(null);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const navigate = useNavigate();
  // Fetch data on initial render and when the date changes
  useEffect(() => {
    if (selectedDate) fetchSalesSummary(selectedDate);
  }, [selectedDate]);

  return (
    <Container maxWidth="xl" style={{ marginTop: "20px" }}>
      <Paper elevation={0} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom style={{ color: "blue" }}>
          Sales Summary for {salesSummary ? new Date(salesSummary.date).toDateString() : "-"}
        </Typography>


        Date Filter
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <TextField
            label="Select Date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: "200px" }}
          />
        </Box>
        <br />
        {salesSummary ? (
          <>
            <Grid container spacing={4}>
              {/* Departments Card */}
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ backgroundColor: "#e3f2fd" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom style={{ color: "#800000" }}>
                      Departments
                    </Typography>
                    {salesSummary.departments.map((department) => (
                      <Typography key={department._id} >
                        <span style={{ fontWeight: "bold", color: "black" }}>
                          {department.name}</span>: Kshs {department.amount.toLocaleString()}

                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>

              {/* Payment Modes Card */}
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ backgroundColor: "#ede7f6" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom style={{ color: "#7e57c2" }}>
                      Payment Modes
                    </Typography>
                    {salesSummary.paymentModes.map((paymentMode) => (
                      <Typography key={paymentMode._id}>
                        <span style={{ fontWeight: "bold", color: "black" }}>
                          {paymentMode.mode}
                        </span>
                        : Kshs {paymentMode.amount.toLocaleString()}
                      </Typography>

                    ))}
                  </CardContent>
                </Card>
              </Grid>
              {/* Cash Details */}
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom style={{ color: "#ff9800" }}>
                      Cash Details
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Cash To Be Banked: </span>Kshs {salesSummary.CashToBeBanked.toLocaleString()}

                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Cash To Expenses:</span> Kshs {salesSummary.cashToExpenses.toLocaleString()}

                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* Variance Details */}
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom style={{ color: "#d32f2f" }}>
                      Variance Details
                    </Typography>
                    {salesSummary.varianceDetails.map((variance) => (
                      <Box key={variance._id} sx={{ mb: 2 }}>
                        <Typography>
                          <span style={{ fontWeight: "bold", color: "black" }}>
                            Date:</span> {new Date(variance.date).toDateString()}

                        </Typography>
                        <Typography><span style={{ fontWeight: "bold", color: "black" }}>Person:</span>{variance.personName}</Typography>
                        <Typography>
                          <span style={{ fontWeight: "bold", color: "black" }}>
                            Amount:</span> Kshs {variance.amount.toLocaleString()}

                        </Typography>
                        <Typography><span style={{ fontWeight: "bold", color: "black" }}>Recovery Mode:</span> {variance.recoveryMode}</Typography>
                        <Typography><span style={{ fontWeight: "bold", color: "black" }}>Explanation: </span>{variance.explanation}</Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
              {/* Totals Card */}
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom style={{ color: "#388e3c" }}>
                      Totals
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Total Sales:</span> Kshs {salesSummary.totalSales.toLocaleString()}

                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Total Payments:</span> Kshs {salesSummary.totalPayments.toLocaleString()}

                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Variance Amount:</span> Kshs {salesSummary.varianceAmount.toLocaleString()}

                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* Allowed Payments */}
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom style={{ color: "#E91E63" }}>
                      Allowed Payments
                    </Typography>
                    {salesSummary.allowedPayments.map((payment) => (
                      <Typography key={payment._id}>
                        <span style={{ fontWeight: "bold", color: "black" }}>
                          {payment.description}:</span> Kshs {payment.amount.toLocaleString()}

                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography variant="h6" align="center" color="error">
            No data available for the selected date.
          </Typography>
        )}
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
    </Container>
  );
};

export default ManagerDirectorDashboard;
