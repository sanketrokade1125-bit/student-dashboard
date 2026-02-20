let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

function updateTotalCount() {
  document.getElementById("totalStudents").innerText =
    "Total Students: " + students.length;
}

function addStudent() {
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const course = document.getElementById("course").value.trim();

  if (!name || !age || !course) {
    alert("Fill all fields");
    return;
  }

  if (editIndex === -1) {
    students.push({ name, age, course });
  } else {
    students[editIndex] = { name, age, course };
    editIndex = -1;
  }

  saveToLocalStorage();
  displayStudents();
  clearInputs();
}

function displayStudents(list = students) {
  const table = document.getElementById("studentTable");
  table.innerHTML = "";

  list.forEach((student, index) => {
    table.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.course}</td>
        <td>
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  updateTotalCount();
}

function deleteStudent(index) {
  students.splice(index, 1);
  saveToLocalStorage();
  displayStudents();
}

function editStudent(index) {
  const student = students[index];

  document.getElementById("name").value = student.name;
  document.getElementById("age").value = student.age;
  document.getElementById("course").value = student.course;

  editIndex = index;
}

function searchStudent() {
  const keyword = document.getElementById("search").value.toLowerCase();

  const filtered = students.filter(student =>
    student.name.toLowerCase().includes(keyword) ||
    student.course.toLowerCase().includes(keyword)
  );

  displayStudents(filtered);
}

function filterByCourse() {
  const selected = document.getElementById("filterCourse").value;

  if (!selected) {
    displayStudents();
    return;
  }
  const filtered = students.filter(student =>
    student.course === selected
  );

  displayStudents(filtered);
}

function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("course").value = "";
}

displayStudents();
