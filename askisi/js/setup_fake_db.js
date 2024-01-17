window.onload = function () {
    // setup users
    if (localStorage.getItem("user") === null) {
        var users = [];
        for (var i=1; i<10; i++) {
            users.push({name:'user'+i, pw:'password'+i, fullName:'Full Name'+i, sdi: 'sdi'+210000+i});
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

    // setup 
}