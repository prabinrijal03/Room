const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('./config/db');
const userModel = require('./model/user.model');

const app = express();
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    try {
      const { phoneNumber } = req.body;
  
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
  
      // Create a new user instance
      const user = new userModel({ phoneNumber, otp });
  
      // Save the user to the database
      await user.save();
  
      // Send the OTP to the phone number using a third-party SMS service provider
      await sendOTP(phoneNumber, otp);
  
      res.status(200).json({ message: 'OTP sent successfully!' });
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  

// Function to send OTP to a phone number using a third-party SMS service provider
async function sendOTP(phoneNumber, otp) {
  const apiKey = '17476498';
  const apiSecret = 'L0rhllEjy7WI99hw';
  const smsProviderUrl = 'https://rest.nexmo.com/sms/json';

  const message = `Your OTP is: ${otp}`;

  const response = await axios.post(smsProviderUrl, {
    apiKey,
    apiSecret,
    phoneNumber,
    message
  });

  console.log('OTP Sent:', response.data);
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
