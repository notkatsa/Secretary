document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
});

function loadCourses() {
    // Fetch the courses from the backend and populate the dropdown
    // For demonstration, let's assume we have an array of courses
    let courses = ['Αναλυση Ι', 'Αναλυση ΙΙ', 'Αριθμητική Ανάλυση'];
    let courseDropdown = document.getElementById('courseDropdown');
    let randomIndex = Math.floor(Math.random() * courses.length);

    courses.forEach((course, index) => {
        let option = document.createElement('option');
        option.value = course;
        option.innerText = course;
        
        if (index == randomIndex){
            option.disabled = true;
            option.innerText += " (Μη διαθέσιμο για βαθμολογία)"
        }
        courseDropdown.appendChild(option);
    });
}   

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitGradesBtn').addEventListener('click', function() {
        showGradeEntrySection();
    });

    // Assuming you have a dropdown for selecting a course
    document.getElementById('courseSelectSubmit').addEventListener('change', function() {
        loadGradeEntryForm(this.value);
    });
});

function showGradeEntrySection() {
    // Hide other sections and show the grade entry section
    document.getElementById('viewGradesSection').style.display = 'none';
    document.getElementById('submitGradesSection').style.display = 'block';
}

function loadGradeEntryForm(course) {
    // Logic to load the grade entry form for the selected course
    // Fetch student data and populate the form
    console.log('Loading grade entry form for:', course);
    // Example: Populate form fields for entering grades
}

