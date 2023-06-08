// Function to handle teacher form submission
function handleTeacherForm(event) {
    event.preventDefault();
  
    var username = document.getElementById('username').value;
    var subject = document.getElementById('subject').value;
    var email = document.getElementById('email').value;
    var teacherKey = document.getElementById('key').value;
  
    // Create teacher object
    var teacher = {
      username: username,
      subject: subject,
      email: email,
      password: teacherKey
    };
  
    // Retrieve existing teacher data from local storage
    var teachers = JSON.parse(localStorage.getItem('teachers')) || [];
  
    // Add new teacher to the array
    teachers.push(teacher);
  
    // Save updated teacher data to local storage
    localStorage.setItem('teachers', JSON.stringify(teachers));
  
    // Clear the form fields
    document.getElementById('username').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('email').value = '';
    document.getElementById('key').value = '';
  
    // Update teacher list
    updateTeacherList();
  
    alert('Teacher information saved successfully!');
  }
  
  // Function to delete a teacher
  function deleteTeacher(teacherIndex) {
    var teachers = JSON.parse(localStorage.getItem('teachers')) || [];
  
    // Remove the teacher from the array
    teachers.splice(teacherIndex, 1);
  
    // Save updated teacher data to local storage
    localStorage.setItem('teachers', JSON.stringify(teachers));
  
    // Update teacher list
    updateTeacherList();
  
    alert('Teacher information deleted successfully!');
  }
  
  // Function to update a teacher
  function updateTeacher(teacherIndex) {
    var teachers = JSON.parse(localStorage.getItem('teachers')) || [];
  
    var teacher = teachers[teacherIndex];
  
    // Pre-fill the form fields with existing data
    document.getElementById('username').value = teacher.username;
    document.getElementById('subject').value = teacher.subject;
    document.getElementById('email').value = teacher.email;
    document.getElementById('key').value = teacher.password;
  
    // Remove the teacher from the array
    teachers.splice(teacherIndex, 1);
  
    // Save updated teacher data to local storage
    localStorage.setItem('teachers', JSON.stringify(teachers));
  
    // Update teacher list
    updateTeacherList();
  
    alert('You can now update the teacher information.');
  }
  
  // Function to update the teacher list
  function updateTeacherList() {
    var teacherTable = document.getElementById('teacherTable');
    var teachers = JSON.parse(localStorage.getItem('teachers')) || [];
  
    // Clear the table body
    teacherTable.innerHTML = '<tr><th>Name</th><th>Subject</th><th>Email</th><th>Teacher Key</th><th>Actions</th></tr>';
  
    // Populate the table with teacher data
    teachers.forEach(function(teacher, index) {
      var row = document.createElement('tr');
      var usernameCell = document.createElement('td');
      var subjectCell = document.createElement('td');
      var emailCell = document.createElement('td');
      var keyCell = document.createElement('td');
      var actionsCell = document.createElement('td');
      var deleteButton = document.createElement('button');
      var updateButton = document.createElement('button');
  
      usernameCell.textContent = teacher.username;
      subjectCell.textContent = teacher.subject;
      emailCell.textContent = teacher.email;
      keyCell.textContent = teacher.password;
  
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        deleteTeacher(index);
      });
  
      updateButton.textContent = 'Update';
      updateButton.addEventListener('click', function() {
        updateTeacher(index);
      });
  
      actionsCell.className = 'actions';
      actionsCell.appendChild(deleteButton);
      actionsCell.appendChild(updateButton);
  
      row.appendChild(usernameCell);
      row.appendChild(subjectCell);
      row.appendChild(emailCell);
      row.appendChild(keyCell);
      row.appendChild(actionsCell);
  
      teacherTable.appendChild(row);
    });
  }
  
  // Add event listener to the form
  document.getElementById('teacherForm').addEventListener('submit', handleTeacherForm);
  
  // Update teacher list on page load
  updateTeacherList();

// Retrieve data from local storage
var forgotPassRequestData = localStorage.getItem('forgotPassRequest');
var forgotPassCode = localStorage.getItem('forgotPassCode');

// Parse the data into an object
var requestData = JSON.parse(forgotPassRequestData);

// Get a reference to the table body
var tableBody = document.getElementById('resetRequestTable').getElementsByTagName('tbody')[0];

// Create a new table row
var row = document.createElement('tr');

// Create the name cell
var nameCell = document.createElement('td');
nameCell.textContent = requestData.name;

// Create the email cell
var emailCell = document.createElement('td');
emailCell.textContent = requestData.email;

// Create the code cell
var codeCell = document.createElement('td');
codeCell.textContent = forgotPassCode;

// Append the cells to the row
row.appendChild(nameCell);
row.appendChild(emailCell);
row.appendChild(codeCell);

// Append the row to the table body
tableBody.appendChild(row);

  function logout() {
    localStorage.getItem('username', 'admin');
    localStorage.removeItem(username);
    window.location.href = 'login.html';
  }