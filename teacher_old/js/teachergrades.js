document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
    document.getElementById('viewGradesBtn').addEventListener('click', function() {
        toggleSection('viewGradesSection');
        loadGrades();
    });

    document.getElementById('submitGradesBtn1').addEventListener('click', function() {
        toggleSection('submitGradesSection');
        loadStudentsForGrading();
    });

    document.getElementById('saveGradesBtn').addEventListener('click', saveGrades);
});

function loadCourses() {
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    const currentTeacher = teachers.find(t => t.name === 'Teacher1'); // Replace with dynamic teacher name
    if (currentTeacher && currentTeacher.courses) {
        const courseDropdown = document.getElementById('courseDropdown');
        currentTeacher.courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course;
            option.textContent = course;
            courseDropdown.appendChild(option);
        });
    }
}

function toggleSection(sectionId) {
    document.querySelectorAll('.grades-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function loadGrades() {
    let grades = JSON.parse(localStorage.getItem('grades')) || [];
    let tableBody = document.querySelector('#viewGradesTable tbody');
    tableBody.innerHTML = '';

    grades.forEach(entry => {
        entry.grades.forEach(grade => {
            let row = tableBody.insertRow();
            row.insertCell(0).innerText = entry.sdi;
            row.insertCell(1).innerText = Object.keys(grade)[0]; // Assuming each grade object has one key (course name)
            row.insertCell(2).innerText = grade[Object.keys(grade)[0]]; // The grade value
        });
    });
}

function loadStudentsForGrading() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let tableBody = document.querySelector('#submitGradesTable tbody');
    tableBody.innerHTML = '';

    students.forEach(student => {
        let row = tableBody.insertRow();
        row.insertCell(0).innerText = student.sdi;
        row.insertCell(1).innerText = student.name;
        let gradeCell = row.insertCell(2);
        gradeCell.innerHTML = `<input type='number' min='0' max='10' name='grade_${student.sdi}'>`;
    });
}

function saveGrades() {
    let grades = JSON.parse(localStorage.getItem('grades')) || [];
    let course = document.getElementById('courseDropdown').value;

    document.querySelectorAll('#submitGradesTable tbody input').forEach(input => {
        let studentId = input.name.split('_')[1];
        let newGrade = input.value;
        
        let studentEntry = grades.find(entry => entry.sdi === studentId);
        if (studentEntry) {
            studentEntry.grades[course] = newGrade;
        }
    });

    localStorage.setItem('grades', JSON.stringify(grades));
    alert('Grades saved successfully!');
}
