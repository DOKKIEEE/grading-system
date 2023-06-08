function generateCode() {
  var code = Math.floor(100000 + Math.random() * 900000); // Generate a random six-digit code
  return code.toString();
}

document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  var name = document.getElementById('name').value;

  // Generate and store the code in local storage
  var code = generateCode();
  localStorage.setItem('forgotPassCode', code);

  // Store the email and name in local storage
  var forgotPassRequest = {
    email: email,
    name: name
  };
  localStorage.setItem('forgotPassRequest', JSON.stringify(forgotPassRequest));

  // Display a success message with the code
  alert('A verification code has been sent to your email. Please check your inbox and enter the code to reset your password.');

  // Reset the form
  document.getElementById('forgotPasswordForm').reset();

  // Redirect to changePass.html
  window.location.href = 'changePass.html';
});