// Add student to the table
function addStudentToTable(student) {
  const table = document.getElementById('student-table').getElementsByTagName('tbody')[0];
  const row = table.insertRow();

  const rankCell = row.insertCell();
  rankCell.textContent = '';

  const nameCell = row.insertCell();
  nameCell.textContent = student.name;

  const keyCell = row.insertCell();
  keyCell.textContent = student.key;

  const contactCell = row.insertCell();
  contactCell.textContent = student.contact;

  const activity1ScoreCell = row.insertCell();
  activity1ScoreCell.textContent = student.activity1 + '/' + student.activity1Items;

  const activity2ScoreCell = row.insertCell();
  activity2ScoreCell.textContent = student.activity2 + '/' + student.activity2Items;

  const activity3ScoreCell = row.insertCell();
  activity3ScoreCell.textContent = student.activity3 + '/' + student.activity3Items;

  const quiz1ScoreCell = row.insertCell();
  quiz1ScoreCell.textContent = student.quiz1 + '/' + student.quiz1Items;

  const quiz2ScoreCell = row.insertCell();
  quiz2ScoreCell.textContent = student.quiz2 + '/' + student.quiz2Items;

  const quiz3ScoreCell = row.insertCell();
  quiz3ScoreCell.textContent = student.quiz3 + '/' + student.quiz3Items;

  const attendanceCell = row.insertCell();
  attendanceCell.textContent = student.attendance;

  const recitationCell = row.insertCell();
  recitationCell.textContent = student.recitation;

  const performanceTask1ScoreCell = row.insertCell();
  performanceTask1ScoreCell.textContent = student.performanceTask1 + '/' + student.performanceTask1Items;

  const performanceTask2ScoreCell = row.insertCell();
  performanceTask2ScoreCell.textContent = student.performanceTask2 + '/' + student.performanceTask2Items;

  const performanceTask3ScoreCell = row.insertCell();
  performanceTask3ScoreCell.textContent = student.performanceTask3 + '/' + student.performanceTask3Items;

  const examScoreCell = row.insertCell();
  examScoreCell.textContent = student.exam + '/' + student.examItems;

  // Calculate final point, transmuted grade, and remarks
  const weightedWrittenScore =
    (student.quiz1 + student.quiz2 + student.quiz3 + student.activity1 + student.activity2 + student.activity3) /
    (student.quiz1Items + student.activity2Items + student.activity3Items + student.quiz1Items + student.quiz2Items + student.quiz3Items) * 100;
  const weightedPerformanceScore =
    (student.attendance +
      student.recitation +
      student.performanceTask1 +
      student.performanceTask2 +
      student.performanceTask3) /
    (student.performanceTask1Items + student.performanceTask2Items + student.performanceTask3Items + 100 + 100) * 100;
  const weightedExamScore = student.exam / student.examItems * 100;

  const finalPoint =
    weightedWrittenScore * 0.2 +
    weightedPerformanceScore * 0.5 +
    weightedExamScore * 0.3;

  const finalPointCell = row.insertCell();
  finalPointCell.textContent = finalPoint.toFixed(2);

  // Calculate transmuted grade and remarks
  let transmutedGrade;
  let remarks;

  if (finalPoint >= 98) {
    transmutedGrade = '1.00';
    remarks = 'Excellent';
  } else if (finalPoint >= 95) {
    transmutedGrade = '1.25';
    remarks = 'Excellent';
  } else if (finalPoint >= 92) {
    transmutedGrade = '1.50';
    remarks = 'Very Good';
  } else if (finalPoint >= 89) {
    transmutedGrade = '1.75';
    remarks = 'Very Good';
  } else if (finalPoint >= 86) {
    transmutedGrade = '2.00';
    remarks = 'Good';
  } else if (finalPoint >= 83) {
    transmutedGrade = '2.25';
    remarks = 'Good';
  } else if (finalPoint >= 80) {
    transmutedGrade = '2.50';
    remarks = 'Satisfactory';
  } else if (finalPoint >= 77) {
    transmutedGrade = '2.75';
    remarks = 'Satisfactory';
  } else if (finalPoint >= 75) {
    transmutedGrade = '3.00';
    remarks = 'Passed';
  } else {
    transmutedGrade = '5.00';
    remarks = 'Failed';
  }

  const transmutedGradeCell = row.insertCell();
  transmutedGradeCell.textContent = transmutedGrade;

  const remarksCell = row.insertCell();
  remarksCell.textContent = remarks;

  const actionCell = row.insertCell();
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function () {
    editStudentData(student);
  });
  actionCell.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    deleteStudentData(student);
  });
  actionCell.appendChild(deleteButton);

  // Sort the table rows based on final point in descending order
  sortTable();
}

// Sort the table rows based on final point in descending order
function sortTable() {
  const table = document.getElementById('student-table');
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  rows.sort((a, b) => {
    const pointA = parseFloat(a.cells[16].textContent);
    const pointB = parseFloat(b.cells[16].textContent);
    return pointB - pointA;
  });

  // Clear the table body
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  // Reorder the rows in the table body
  rows.forEach((row, index) => {
    const rankCell = row.cells[0];
    rankCell.textContent = index + 1;

    tbody.appendChild(row);
  });
  
}



// Save student data to local storage
function saveStudentData(student, username) {
  const students = JSON.parse(localStorage.getItem(`${username}_teacherData`)) || [];
  const studentList = JSON.parse(localStorage.getItem('studentList')) || [];
  student.teacherSubject = localStorage.getItem(`${username}_teacherSubject`);

  // // Check if a student with the same name and subject already exists
  // const existingStudent = students.find(
  //   (s) => s.name === student.name && s.teacherSubject === student.teacherSubject
  // );

  // if (existingStudent) {
  //   alert('This student already exists, It will update the student Data');
  //   return;
  // }

  // Find the index of the student in the students array
  const studentIndex = students.findIndex((s) => s.key === student.key);

  // Calculate final point, transmuted grade, and remarks
  const weightedWrittenScore =
    (student.quiz1 + student.quiz2 + student.quiz3 + student.activity1 + student.activity2 + student.activity3) / (student.quiz1Items + student.activity2Items + student.activity3Items + student.quiz1Items + student.quiz2Items + student.quiz3Items) * 100;
  const weightedPerformanceScore =
    (student.attendance +
      student.recitation +
      student.performanceTask1 +
      student.performanceTask2 +
      student.performanceTask3) /
    (student.performanceTask1Items + student.performanceTask2Items + student.performanceTask3Items + 100 + 100) * 100;
  const weightedExamScore = (student.exam / student.examItems) * 100;

  const finalPoint =
    weightedWrittenScore * 0.2 +
    weightedPerformanceScore * 0.5 +
    weightedExamScore * 0.3;

  let transmutedGrade;
  let remarks;

  if (finalPoint >= 98) {
    transmutedGrade = '1.00';
    remarks = 'Excellent';
  } else if (finalPoint >= 95) {
    transmutedGrade = '1.25';
    remarks = 'Excellent';
  } else if (finalPoint >= 92) {
    transmutedGrade = '1.50';
    remarks = 'Very Good';
  } else if (finalPoint >= 89) {
    transmutedGrade = '1.75';
    remarks = 'Very Good';
  } else if (finalPoint >= 86) {
    transmutedGrade = '2.00';
    remarks = 'Good';
  } else if (finalPoint >= 83) {
    transmutedGrade = '2.25';
    remarks = 'Good';
  } else if (finalPoint >= 80) {
    transmutedGrade = '2.50';
    remarks = 'Satisfactory';
  } else if (finalPoint >= 77) {
    transmutedGrade = '2.75';
    remarks = 'Satisfactory';
  } else if (finalPoint >= 75) {
    transmutedGrade = '3.00';
    remarks = 'Passed';
  } else {
    transmutedGrade = '5.00';
    remarks = 'Failed';
  }

  student.finalPoint = finalPoint.toFixed(2);
  student.transmutedGrade = transmutedGrade;
  student.remarks = remarks;

  if (studentIndex !== -1) {
    // Update the existing student data
    students[studentIndex] = student;
    studentList[studentIndex] = student;
  } else {
    // Add the new student data
    students.push(student);
    studentList.push(student);
  }

  localStorage.setItem(`${username}_teacherData`, JSON.stringify(students));
  localStorage.setItem('studentList', JSON.stringify(studentList));
}



// Load student data from local storage
function loadStudentData(username) {
  const teacherData = JSON.parse(localStorage.getItem(`${username}_teacherData`)) || [];
  teacherData.forEach((student) => {
    addStudentToTable(student);
  });
}

// Save teacher subject to local storage
function saveTeacherSubject(subject, username) {
  localStorage.setItem(`${username}_teacherSubject`, subject);
  loadTeacherSubject(username);
}

// Load teacher subject from local storage
function loadTeacherSubject(username) {
  const subject = localStorage.getItem(`${username}_teacherSubject`) || '';
  document.getElementById('subject').textContent = subject;
}

// Handle subject form submission
document.getElementById('subject-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const subject = document.getElementById('subject-input').value;
  const username = localStorage.getItem('loggedInUser');

  saveTeacherSubject(subject, username);

  // Clear form field after submission
  document.getElementById('subject-form').reset();
});

// Delete teacher subject from local storage
function deleteTeacherSubject(username) {
  localStorage.removeItem(`${username}_teacherSubject`);
  document.getElementById('subject').textContent = '';
}

// Handle subject deletion
document.getElementById('delete-subject-btn').addEventListener('click', function () {
  const username = localStorage.getItem('loggedInUser');
  deleteTeacherSubject(username);
});

// Handle student form submission
document.getElementById('student-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const key = document.getElementById('key').value;
  const contact = document.getElementById('contact').value;
  const activity1 = parseInt(document.getElementById('activity1').value);
  const activity1Items = parseInt(document.getElementById('activity1-items').value);
  const activity2 = parseInt(document.getElementById('activity2').value);
  const activity2Items = parseInt(document.getElementById('activity2-items').value);
  const activity3 = parseInt(document.getElementById('activity3').value);
  const activity3Items = parseInt(document.getElementById('activity3-items').value);
  const quiz1 = parseInt(document.getElementById('quiz1').value);
  const quiz1Items = parseInt(document.getElementById('quiz1-items').value);
  const quiz2 = parseInt(document.getElementById('quiz2').value);
  const quiz2Items = parseInt(document.getElementById('quiz2-items').value);
  const quiz3 = parseInt(document.getElementById('quiz3').value);
  const quiz3Items = parseInt(document.getElementById('quiz3-items').value);
  const attendance = parseInt(document.getElementById('attendance').value);
  const recitation = parseInt(document.getElementById('recitation').value);
  const performanceTask1 = parseInt(document.getElementById('performance-task1').value);
  const performanceTask1Items = parseInt(document.getElementById('performance-task1-items').value);
  const performanceTask2 = parseInt(document.getElementById('performance-task2').value);
  const performanceTask2Items = parseInt(document.getElementById('performance-task2-items').value);
  const performanceTask3 = parseInt(document.getElementById('performance-task3').value);
  const performanceTask3Items = parseInt(document.getElementById('performance-task3-items').value);
  const exam = parseInt(document.getElementById('exam').value);
  const examItems = parseInt(document.getElementById('exam-items').value);

  const student = {
    name: name,
    key: key,
    contact: contact,
    activity1: activity1,
    activity1Items: activity1Items,
    activity2: activity2,
    activity2Items: activity2Items,
    activity3: activity3,
    activity3Items: activity3Items,
    quiz1: quiz1,
    quiz1Items: quiz1Items,
    quiz2: quiz2,
    quiz2Items: quiz2Items,
    quiz3: quiz3,
    quiz3Items: quiz3Items,
    attendance: attendance,
    recitation: recitation,
    performanceTask1: performanceTask1,
    performanceTask1Items: performanceTask1Items,
    performanceTask2: performanceTask2,
    performanceTask2Items: performanceTask2Items,
    performanceTask3: performanceTask3,
    performanceTask3Items: performanceTask3Items,
    exam: exam,
    examItems: examItems,
  };

  const username = localStorage.getItem('loggedInUser');

  saveStudentData(student, username);

  // Add student data to the table
  addStudentToTable(student);

  // Clear form fields after submission
  document.getElementById('student-form').reset();
});

// Edit student data
function editStudentData(student) {
  // Fill the form with existing data
  document.getElementById('name').value = student.name;
  document.getElementById('key').value = student.key;
  document.getElementById('contact').value = student.contact;
  document.getElementById('activity1').value = student.activity1;
  document.getElementById('activity1-items').value = student.activity1Items;
  document.getElementById('activity2').value = student.activity2;
  document.getElementById('activity2-items').value = student.activity2Items;
  document.getElementById('activity3').value = student.activity3;
  document.getElementById('activity3-items').value = student.activity3Items;
  document.getElementById('quiz1').value = student.quiz1;
  document.getElementById('quiz1-items').value = student.quiz1Items;
  document.getElementById('quiz2').value = student.quiz2;
  document.getElementById('quiz2-items').value = student.quiz2Items;
  document.getElementById('quiz3').value = student.quiz3;
  document.getElementById('quiz3-items').value = student.quiz3Items;
  document.getElementById('attendance').value = student.attendance;
  document.getElementById('recitation').value = student.recitation;
  document.getElementById('performance-task1').value = student.performanceTask1;
  document.getElementById('performance-task1-items').value = student.performanceTask1Items;
  document.getElementById('performance-task2').value = student.performanceTask2;
  document.getElementById('performance-task2-items').value = student.performanceTask2Items;
  document.getElementById('performance-task3').value = student.performanceTask3;
  document.getElementById('performance-task3-items').value = student.performanceTask3Items;
  document.getElementById('exam').value = student.exam;
  document.getElementById('exam-items').value = student.examItems;

  // Remove the student data from the table
  const table = document.getElementById('student-table');
  const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  const studentIndex = Array.from(rows).findIndex((row) => {
    return row.cells[1].textContent === student.key;
  });
  table.deleteRow(studentIndex + 1);

  // Update the form submission event listener to edit the existing student
  document.getElementById('student-form').removeEventListener('submit', submitStudentForm);
  document.getElementById('student-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const editedStudent = {
      name: document.getElementById('name').value,
      key: document.getElementById('key').value,
      contact: document.getElementById('contact').value,
      activity1: parseInt(document.getElementById('activity1').value),
      activity1Items: parseInt(document.getElementById('activity1-items').value),
      activity2: parseInt(document.getElementById('activity2').value),
      activity2Items: parseInt(document.getElementById('activity2-items').value),
      activity3: parseInt(document.getElementById('activity3').value),
      activity3Items: parseInt(document.getElementById('activity3-items').value),
      quiz1: parseInt(document.getElementById('quiz1').value),
      quiz1Items: parseInt(document.getElementById('quiz1-items').value),
      quiz2: parseInt(document.getElementById('quiz2').value),
      quiz2Items: parseInt(document.getElementById('quiz2-items').value),
      quiz3: parseInt(document.getElementById('quiz3').value),
      quiz3Items: parseInt(document.getElementById('quiz3-items').value),
      attendance: parseInt(document.getElementById('attendance').value),
      recitation: parseInt(document.getElementById('recitation').value),
      performanceTask1: parseInt(document.getElementById('performance-task1').value),
      performanceTask1Items: parseInt(document.getElementById('performance-task1-items').value),
      performanceTask2: parseInt(document.getElementById('performance-task2').value),
      performanceTask2Items: parseInt(document.getElementById('performance-task2-items').value),
      performanceTask3: parseInt(document.getElementById('performance-task3').value),
      performanceTask3Items: parseInt(document.getElementById('performance-task3-items').value),
      exam: parseInt(document.getElementById('exam').value),
      examItems: parseInt(document.getElementById('exam-items').value),
    };

    const username = localStorage.getItem('loggedInUser');

    saveStudentData(editedStudent, username);

    // Add edited student data back to the table
    addStudentToTable(editedStudent);

    // Clear form fields after submission
    document.getElementById('student-form').reset();

    // Remove the event listener for editing student data
    document.getElementById('student-form').removeEventListener('submit', submitStudentForm);
  });
}

function deleteStudentData(student) {
  // Remove the student data from the table
  const table = document.getElementById('student-table');
  const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  const studentIndex = Array.from(rows).findIndex((row) => {
    return row.cells[1].textContent === student.key;
  });
  table.deleteRow(studentIndex + 1);

  // Remove student from teacherData
  const username = localStorage.getItem('loggedInUser');
  const teacherData = JSON.parse(localStorage.getItem(`${username}_teacherData`)) || [];
  const updatedTeacherData = teacherData.filter((item) => {
    return item.name !== student.name || item.teacherSubject !== student.teacherSubject;
  });
  localStorage.setItem(`${username}_teacherData`, JSON.stringify(updatedTeacherData));

  // Remove student from studentList
  const studentList = JSON.parse(localStorage.getItem('studentList')) || [];
  const updatedStudentList = studentList.filter((item) => {
    return item.name !== student.name || item.teacherSubject !== student.teacherSubject;
  });
  localStorage.setItem('studentList', JSON.stringify(updatedStudentList));
  location.reload();
}


// Logout function
function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'login.html'; // Redirect to the login page
}

// Load teacher subject and student data on page load
document.addEventListener('DOMContentLoaded', function () {
  const username = localStorage.getItem('loggedInUser');
  loadTeacherSubject(username);
  loadStudentData(username);
});

  // Retrieve the "loggedInUser" key from local storage
  const loggedInUser = localStorage.getItem("loggedInUser");

  // Check if the key exists in local storage
  if (loggedInUser) {
    // Display the username in the HTML element
    document.getElementById("username").textContent = loggedInUser;
  } else {
    // Handle the case when the key doesn't exist
    document.getElementById("username").textContent = "User not logged in";
  }
