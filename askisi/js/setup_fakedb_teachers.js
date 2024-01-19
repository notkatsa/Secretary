window.onload = function () {
    initializeUsers();
    initializeGrades();
    initializeSecurityHistory();
    initializeTeachers();
    initializeStudents();
};

function initializeUsers() {
    if (localStorage.getItem("users") === null) {
        var users = [];
        for (var i = 1; i <= 10; i++) {
            users.push({
                name: 'user' + i,
                pw: 'password' + i,
                fullName: 'Full Name' + i,
                sdi: 'sdi' + (210000 + i),
                email: 'student' + i + '@di.uoa.gr'
            });
        }
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function initializeGrades() {
    if (localStorage.getItem("grades") === null) {
        var grades = [];
        for (var i = 1; i <= 10; i++) {
            var studentGrades = {};
            var courses = ['Course1', 'Course2', 'Course3']; // Replace with actual course names
            courses.forEach(course => {
                studentGrades[course] = Math.floor(Math.random() * 10) + 1; // Random grade between 1 and 10
            });
    
            grades.push({ sdi: 'sdi' + (210000 + i), grades: studentGrades });
        }
        localStorage.setItem('grades', JSON.stringify(grades));
    }
}

function initializeTeachers() {
    if (localStorage.getItem("teachers") === null) {
        var teachers = [
            { name: 'Teacher1', courses: ['Course1', 'Course2'] },
            { name: 'Teacher2', courses: ['Course3', 'Course4'] }
            // Add more teachers as needed
        ];
        localStorage.setItem('teachers', JSON.stringify(teachers));
    }
}

function initializeStudents() {
    if (localStorage.getItem("students") === null) {
        var students = [];
        for (var i = 1; i <= 10; i++) {
            students.push({
                sdi: 'sdi' + (210000 + i),
                name: 'Student ' + i,
            });
        }
        localStorage.setItem('students', JSON.stringify(students));
    }
}
