document.getElementById('change-password-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get form values
    var username = document.getElementById('username').value;
    var newPassword = document.getElementById('new-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    var code = document.getElementById('code').value;
  
    // Validate form values
    if (username === '') {
      alert('Please enter your username.');
      return;
    }
  
    if (newPassword === '') {
      alert('Please enter a new password.');
      return;
    }
  
    if (confirmPassword === '') {
      alert('Please confirm your new password.');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password must match.');
      return;
    }
  
    if (code === '') {
      alert('Please enter the verification code.');
      return;
    }
  
    // Retrieve data from local storage
    var teachersData = JSON.parse(localStorage.getItem('teachers'));
    var forgotPassCodeData = (localStorage.getItem('forgotPassCode'));
  
    // Find the teacher object with the matching username
    var teacher = teachersData.find(function(item) {
      return item.username === username;
    });
  
    if (teacher.username === username && forgotPassCodeData === code) {
      // Update the password
      teacher.password = newPassword;
  
      // Store the updated data back in local storage
      localStorage.setItem('teachers', JSON.stringify(teachersData));
  
      // Clear form inputs
      document.getElementById('username').value = '';
      document.getElementById('new-password').value = '';
      document.getElementById('confirm-password').value = '';
      document.getElementById('code').value = '';
  
      // Show success message
      alert('Password changed successfully!');
      window.location.href = 'login.html';
    } else {
      // Show error message if the username and code do not match
      alert('Invalid username or verification code.');
    }
  });
  
  