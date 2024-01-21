document.addEventListener('DOMContentLoaded', function () {

    if (sessionStorage.getItem("login") === null ){
        const placeholder = document.getElementById('courses-list');
        placeholder.innerHTML = "<h2><a href='login.html'>Παρακαλώ συνδεθείτε</h2>"
        return;
    }

    // Dummy data for courses and students
    const courses = ["Ανάλυση Ι", "Τεχνολογίες Διαδικτύου"];
    const students = JSON.parse(localStorage.getItem('users')) || [];

    // Display courses that can be graded
    const coursesList = document.getElementById('courses-list');
    courses.forEach(course => {
        const courseButton = document.createElement('button');
        courseButton.textContent = course;
        courseButton.addEventListener('click', () => displayGradesTable(course, courseButton));
        coursesList.appendChild(courseButton);
    });

    // Display grades table for the selected course
    function displayGradesTable(course, courseButton) {

        const prevSelectedCourseButton = document.querySelector('.selected-course');
        if (prevSelectedCourseButton) {
            prevSelectedCourseButton.classList.remove('selected-course');
        }

        courseButton.classList.add('selected-course');

        const gradesTableDiv = document.getElementById('grades-table');
        gradesTableDiv.innerHTML = ''; // Clear previous content

        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        const headerCell1 = document.createElement('th');
        headerCell1.textContent = 'Ονοματεπώνυμο';
        const headerCell2 = document.createElement('th');
        headerCell2.textContent = 'ΑΜ';
        const headerCell3 = document.createElement('th');
        headerCell3.textContent = 'Εξάμηνο';
        const headerCell4 = document.createElement('th');
        headerCell4.textContent = 'Βαθμός';

        headerRow.appendChild(headerCell1);
        headerRow.appendChild(headerCell2);
        headerRow.appendChild(headerCell3);
        headerRow.appendChild(headerCell4);
        table.appendChild(headerRow);

        students.forEach(student => {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            cell1.textContent = student.fullName;
            const cell2 = document.createElement('td');
            cell2.textContent = student.sdi;
            const cell3 = document.createElement('td');
            cell3.textContent = 1;
            const cell4 = document.createElement('td');
            const gradeInput = document.createElement('input');
            gradeInput.type = 'number';
            gradeInput.classList.add('grade-input');

            gradeInput.value = getGrade(student.sdi, course);

            function getGrade(sdi, course) {
                // Retrieve the stored data from local storage
                const gradesTeacherData = localStorage.getItem('gradesTeacher');

                // Parse the JSON data
                const gradesTeacher = JSON.parse(gradesTeacherData);

                // Find the course in the data
                const targetCourse = gradesTeacher.find(entry => entry.course === course);

                // If the course is found, find the student in the course
                const studentEntry = targetCourse.grades.find(entry => entry.sdi === sdi);
                return studentEntry.grade;
            }

            cell4.appendChild(gradeInput);
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            row.appendChild(cell4);
            table.appendChild(row);
        });

        gradesTableDiv.appendChild(table);
        const saveButton = document.createElement('button');
        saveButton.id = "save-button";
        saveButton.textContent = 'Αποθήκευση';
        saveButton.addEventListener('click', () => saveGradesTableToSession(course));
        gradesTableDiv.appendChild(saveButton);

        const submitButton = document.createElement('button');
        submitButton.id = "submit-button";
        submitButton.textContent = 'Υποβολή';
        submitButton.addEventListener('click', () => submitTable(course));
        gradesTableDiv.appendChild(submitButton);

        // Check if the lesson has been submitted, and disable buttons and inputs accordingly
        if (sessionStorage.getItem(`submitted${course}`) !== null) {
            disableButtonsAndInputs(course);
        }
        

        // print button
        var printButton = document.createElement("button");
        printButton.textContent = "Εκτύπωση";
        printButton.addEventListener("click", function () {
        // Use html2pdf to generate a PDF from the table
        var pdfOptions = {
            margin: 10,
            filename: `grades${course}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            output: 'blob'  // Set output to 'blob' to get the PDF as a Blob
        };

        // Disable automatic download and get the PDF as a Blob
        html2pdf(table, pdfOptions).then(function (pdfBlob) {
            // Handle the PDF Blob as needed, e.g., open in a new tab
            var blobUrl = URL.createObjectURL(pdfBlob);
            window.open(blobUrl, '_blank');
        });
        });
        gradesTableDiv.appendChild(printButton);

        var exportButton = document.createElement("button");
        exportButton.textContent = "Εξαγωγή";
        exportButton.addEventListener("click", function () {
            grades = JSON.parse(localStorage.getItem("gradesTeacher"));
            let csvContent = "sdi,grade\n";
            grades.forEach(course => {
            course.grades.forEach(student => {
                csvContent += `${student.sdi},${student.grade}\n`;
            });
            });

            // Create a Blob and initiate a download
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'grades.csv';
            link.click();
        });
        gradesTableDiv.appendChild(exportButton);
    }

    // Save grades table to localStorage gradesTeacher
    function saveGradesTableToSession(course) {
        const gradesTable = document.getElementById('grades-table');
        const gradeInputs = gradesTable.querySelectorAll('.grade-input');

        var grades = JSON.parse(localStorage.getItem("gradesTeacher"));

        var courseEntry = grades.find(entry => entry.course === course);
        courseEntry.grades.forEach((gradeEntry, index) => {
            gradeEntry.grade = gradeInputs[index].value.trim();
        });
        message=document.createElement('div');
        message.textContent = "Το βαθμολόγιο αποθηκέυτηκε επιτυχώς";
        message.style = "color: green; margin: 5px;"
        document.getElementById('grades-table').appendChild(message);
        localStorage.setItem('gradesTeacher', JSON.stringify(grades));
    }

    function submitTable(course) {
        if (sessionStorage.getItem(`submitted${course}`) === null) {
            // Grey out buttons for save and submit and disable grades input 
            var isConfirmed = window.confirm("Θέλετε σίγουρα να υποβάλετε οριστικά τo βαθμολόγιο;");
            if (!isConfirmed) return;
            disableButtonsAndInputs(course);

            // Mark the grades table as submitted in sessionStorage
            sessionStorage.setItem(`submitted${course}`, 'true');
        }
    }

    // Helper function to disable buttons and inputs
    function disableButtonsAndInputs(course) {
        const saveButton = document.getElementById("save-button");
        const submitButton = document.getElementById("submit-button");
        const gradeInputs = document.querySelectorAll('.grade-input');

        saveButton.disabled = true;
        submitButton.disabled = true;

        gradeInputs.forEach(input => {
            input.disabled = true;
        });
    }
});
