window.onload = function () {
    if (localStorage.getItem("gradesTeacher") === null) {
        courses = ["Ανάλυση Ι", "Τεχνολογίες Διαδικτύου"]
        gradesteacherlist = []
        for (course of courses) {
            var grades = [];
            for (var i=1; i<10; i++) {
                grades.push({sdi:'sdi210000'+i, grade: 0});
            }
            gradesteacherlist.push({course: course, grades});
        }
        localStorage.setItem('gradesTeacher', JSON.stringify(gradesteacherlist));
    }

    if (localStorage.getItem("users") === null) {
        var users = [];
        for (var i=1; i<10; i++) {
            users.push({name:'user'+i, pw:'password'+i, fullName:'Full Name'+i, sdi: 'sdi'+210000+i, email: 'user'+i+'@di.uoa.gr'});
        }
        localStorage.setItem('users', JSON.stringify(users));
    }

    if (localStorage.getItem("userInfo") === null) {
        var userInfo = [];
        for (var i=1; i<10; i++) {
            userInfo.push({sdi: 'sdi'+210000+i, phoneNumber: -1, dateOfBirth:-1, address: -1});
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo));             
    }
          

}