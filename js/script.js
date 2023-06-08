// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Validate credentials
    var teacherAcc = JSON.parse(localStorage.getItem('teachers')) || [];
    var studentList = JSON.parse(localStorage.getItem('studentList'));
  
    // Portal for admin role
    if (username === "admin" && password === "123") {
        alert("Hello admin");
        localStorage.setItem('username', 'admin');
        window.location.href = 'admin.html';
        return;
    }
  
    // Portal for teacher
    var teacherAccMatch = teacherAcc.find(function (u) {
        return u.username === username && u.password === password;
    });
  
    if (teacherAccMatch) {
        // Successful login as a teacher
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'teacherDashboard.html'; // Redirect to teacher dashboard
        return;
    }
  
    // Portal for students
    if (studentList) {
        for (var i = 0; i < studentList.length; i++) {
            var student = studentList[i];
            if (student.name === username && student.key === password) {
                // Redirect to student dashboard with the logged-in student Name
                localStorage.setItem('loggedInUser', username);
                window.location.href = `studentDashboard.html?id=${student.name}`;
                return;
            }
        }
    }
  
    // Invalid credentials
    document.getElementById('errorMessage').textContent = 'Invalid username or password.';
  });
  