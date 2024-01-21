grades = null;
if (sessionStorage.getItem("login") === null) {
    var newH2 = document.createElement("h2");
    var textNode = document.createTextNode("Συνδεθέιτε για να δείτε τους βαθμούς σας!");
    
    var linkElement = document.createElement("a");
    linkElement.href = "login.html"
    linkElement.appendChild(textNode);

    newH2.appendChild(linkElement);
    var contentDiv = document.getElementById("content");
    contentDiv.appendChild(newH2);
}
else  {
    // do work for grades list
    var sdi = JSON.parse(sessionStorage.getItem("login")).sdi;
    var gradesList = JSON.parse(localStorage.getItem("grades"));

    var student = gradesList.find(student => student.sdi === sdi);
    grades = student.grades;

    var AllButton = document.createElement("button");
    AllButton.textContent = "Όλα";
    AllButton.addEventListener("click", () => createTableAndPrintButton(grades));
    
    passedGrades = grades.filter(course => course[Object.keys(course)[0]] >= 5);
    var PassedButton = document.createElement("button");
    PassedButton.textContent = "Επιτυχίες";
    PassedButton.addEventListener("click", () => createTableAndPrintButton(passedGrades));
    
    failedGrades = grades.filter(course => course[Object.keys(course)[0]] < 5);
    sessionStorage.setItem("failedCourses", JSON.stringify(failedGrades));
    var failedButton = document.createElement("button");
    failedButton.textContent = "Αποτυχίες";
    failedButton.addEventListener("click", () => createTableAndPrintButton(failedGrades));
    
    var contentDiv = document.getElementById("content");
    contentDiv.appendChild(AllButton);
    contentDiv.appendChild(PassedButton);
    contentDiv.appendChild(failedButton);

    createTableAndPrintButton(grades);

}



// auxilary functions

function createTableAndPrintButton(grades) {


    // Get the reference to the div with id 'content'
    var contentDiv = document.getElementById("content");
    contentDiv.innerHTML='<h2>Βαθμολογία</h2>';
    contentDiv.appendChild(AllButton);
    contentDiv.appendChild(PassedButton);
    contentDiv.appendChild(failedButton);

    // Create a table element
    var table = document.createElement("table");

    // Create a table header
    var headerRow = table.createTHead().insertRow(0);
    headerRow.insertCell(0).innerHTML = "Course Name";
    headerRow.insertCell(1).innerHTML = "Grade";
    headerRow.insertCell(2).innerHTML = "Pass/Fail";

    // Create a table body
    var tbody = table.createTBody();

    // Populate the table with course name, grade, and pass/fail for each course
    for (var i = 0; i < grades.length; i++) {
    var courseName = Object.keys(grades[i])[0];
    var gradeValue = grades[i][courseName];

    var row = tbody.insertRow();
    row.insertCell(0).innerHTML = courseName; // Display the course name
    row.insertCell(1).innerHTML = gradeValue.toString(); // Display the grade as a string

    // Determine pass/fail based on the grade (you may need to adjust this logic)
    var passFail = gradeValue >= 5 ? "Pass" : "Fail";

    // Set background color based on pass/fail
    row.style.backgroundColor = passFail === "Pass" ? "green" : "red";

    // Set text color to white for better visibility
    row.style.color = "white";

    row.insertCell(2).innerHTML = passFail;
    }

    // Append the table to the 'content' div
    contentDiv.appendChild(table);

    var printButton = document.createElement("button");
    printButton.textContent = "Εκτύπωση";
    printButton.addEventListener("click", function () {
    // Use html2pdf to generate a PDF from the table
    var pdfOptions = {
        margin: 10,
        filename: 'grades.pdf',
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

    // Append the print button to the 'content' div
    contentDiv.appendChild(printButton);
}