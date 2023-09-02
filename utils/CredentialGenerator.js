function generateUsername() {
  const length = 8; // Set the desired length of the username (e.g., 5 characters)
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let username = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters.charAt(randomIndex);
  }
  return username;
}

// function generateOTP() {
//   let OTP = "";

//   for (let i = 0; i < 4; i++) {
//     const randomDigit = Math.floor(Math.random() * 10); // Generate a random digit (0 to 9)
//     OTP += randomDigit;
//   }

//   return OTP;
// }

// function generatePassword() {
//   const length = 6;
//   const digits = "0123456789";
//   let OTP = "";

//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * digits.length);
//     OTP += digits[randomIndex];
//   }

//   return OTP;
// }

// module.exports = generatePassword;
module.exports = generateUsername;
