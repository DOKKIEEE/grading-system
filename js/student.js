// Retrieve student data from local storage
const studentList = localStorage.getItem("studentList");
const students = JSON.parse(studentList);

// Retrieve the logged-in user's name from local storage
const loggedInUserName = localStorage.getItem("loggedInUser");

// Access the username element
const usernameElement = document.getElementById("username");
usernameElement.textContent = loggedInUserName;

// Access the table body
const tableBody = document.querySelector("#student-table tbody");

// Iterate over each student and create table rows
students.forEach(student => {
  // Check if the student's name matches the logged-in user's name
  if (student.name === loggedInUserName) {
    const row = document.createElement("tr");

    // Add student data to the table row
    row.innerHTML = `
      <td>${student.teacherSubject}</td>
      <td>${student.name}</td>
      <td>${student.key}</td>
      <td>${student.contact}</td>
      <td>${student.activity1}</td>
      <td>${student.activity2}</td>
      <td>${student.activity3}</td>
      <td>${student.quiz1}</td>
      <td>${student.quiz2}</td>
      <td>${student.quiz3}</td>
      <td>${student.attendance}</td>
      <td>${student.recitation}</td>
      <td>${student.performanceTask1}</td>
      <td>${student.performanceTask2}</td>
      <td>${student.performanceTask3}</td>
      <td>${student.exam}</td>
      <td>${student.finalPoint}</td>
      <td>${student.transmutedGrade}</td>
      <td>${student.remarks}</td>
    `;

    // Append the table row to the table body
    tableBody.appendChild(row);
  }

  // Access the logout button element
const logoutButton = document.getElementById("logout-button");

  // Add event listener to the logout button
  logoutButton.addEventListener("click", () => {
    // Clear the logged-in user's data from local storage
    localStorage.removeItem("loggedInUser");
    
    // Redirect the user to the logout page or perform any other desired action
    window.location.href = 'login.html';
  });

});


