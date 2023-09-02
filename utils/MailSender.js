const nodemailer = require("nodemailer");

// Function to send an email
async function sendEmail(body, to, username, otp) {
  try {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Replace with your SMTP server address
      port: 587, // Replace with the appropriate port number
      secure: false, // Set to true if using a secure connection (e.g., TLS)
      auth: {
        user: "aahosny1@gmail.com", // Replace with your email address
        pass: "coseictcaayrjlnx", // Replace with your email password or an app password
      },
      debug: true,
    });

    // Replace placeholders in the template with actual values

    // Define the email options
    const mailOptions = {
      from: "aahosny1@gmail.com", // Replace with the sender's email address
      to: to, // Passed as function argument
      subject: "One Time Password",
      html: `<!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Email</title>
        <style>
          /* Styles to center the content */
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
          }
      
          .container {
            text-align: center;
          }
      
          /* Additional styles for the email content */
          h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 20px;
          }
      
          p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 10px;
          }
      
          strong {
            color: #ff0000;
          }
        </style>
      </head>
      
      <body>
        <div class="container">
        <h1>One time password</h1>
        <p>Dear ${username},</p>
        <p>
          ${body} <strong>${otp}</strong>
        </p>
        <p>Please login the system with this password .</p>
        <p>Don't forget to change your password.</p>
        <p>Thank you .</p>
        </div>
      </body>  
      </html>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendEmail: sendEmail };

{
  /* <body>
  <div class="container">
    <h1>One time password</h1>
    <p>Dear ${username},</p>
    <p>
      Your One-Time Password (OTP) for verification is: <strong>${otp}</strong>
    </p>
    <p>Please login the system with this password .</p>
    <p>Don't forget to change your password.</p>
    <p>Thank you .</p>
  </div>
</body>; */
}
