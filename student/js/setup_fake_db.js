window.onload = function () {
    // setup users
    if (localStorage.getItem("users") === null) {
        var users = [];
        for (var i=1; i<10; i++) {
            users.push({name:'user'+i, pw:'password'+i, fullName:'Full Name'+i, sdi: 'sdi'+210000+i, email: 'user'+i+'@di.uoa.gr'});
        }
        localStorage.setItem('users', JSON.stringify(users));
    }

    // setup grades
    if (localStorage.getItem("grades") === null) {
        var grades = [];
        for (var i=1; i<10; i++) {

            courses = ['Γραμμική Άλγεβρα', 'Διακριτά Μαθηματικά', 'Εισαγωγή στην Πληροφορική και στις Τηλεπικοινωνίες',
            'Εισαγωγή στον Προγραμματισμό', 'Εργαστήριο Λογικής Σχεδίασης', 'Λογική Σχεδίαση'];

            templist = []
            for (course of courses) {
                grade = Math.floor(Math.random() * 10)
                var obj = {};
                obj[course] = grade;
                templist.push(obj);
            }

            grades.push({sdi: 'sdi'+210000+i, grades: templist});
        }

        localStorage.setItem('grades', JSON.stringify(grades));
    } 
    
    // sec history
    if (localStorage.getItem("sec") === null) {
        var sec = [];
        for (var i=1; i<10; i++) {
            sec.push({sdi: 'sdi'+210000+i, reqs: []});
        }
        localStorage.setItem('sec', JSON.stringify(sec));             
    }     

    if (localStorage.getItem("userInfo") === null) {
        var userInfo = [];
        for (var i=1; i<10; i++) {
            userInfo.push({sdi: 'sdi'+210000+i, phoneNumber: -1, dateOfBirth:-1, address: -1});
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo));             
    }
}