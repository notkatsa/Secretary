function addUserToLocalStorage(name, password, fullName, email) {
    // Retrieve existing users from local storage
    const existingUsersJSON = localStorage.getItem('users');
    const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

    // Generate the next SDI based on the pattern
    const nextSdiNumber = existingUsers.length + 1;
    const sdi = `sdi21000${nextSdiNumber}`;

    // Create a new user object
    const newUser = {
        name: name,
        pw: password,
        fullName: fullName,
        sdi: sdi,
        email: email
    };

    // Add the new user to the existing users list
    existingUsers.push(newUser);
    // Store the updated users list back to local storage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Login user
    sessionStorage.setItem('login', JSON.stringify(newUser));

    // Create their grades
    grades = JSON.parse(localStorage.getItem("grades"));
    courses = ['Γραμμική Άλγεβρα', 'Διακριτά Μαθηματικά', 'Εισαγωγή στην Πληροφορική και στις Τηλεπικοινωνίες',
    'Εισαγωγή στον Προγραμματισμό', 'Εργαστήριο Λογικής Σχεδίασης', 'Λογική Σχεδίαση'];
    templist = []
    for (course of courses) {
        grade = Math.floor(Math.random() * 10)
        var obj = {};
        obj[course] = grade;
        templist.push(obj);
    }
    grades.push({sdi: sdi, grades: templist});
    localStorage.setItem('grades', JSON.stringify(grades)); 

    //initialize their info
    existingUsersInfo = JSON.parse(localStorage.getItem("userInfo"));
    existingUsersInfo.push({sdi: sdi, phoneNumber: -1, dateOfBirth:-1, Address: -1});  
    localStorage.setItem("userInfo", JSON.stringify(existingUsersInfo));  
    console.log(`User added successfully: ${JSON.stringify(newUser)}`);
}

// Function to be called on button click
function addUser() {
    // Get user details from the form
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;

    if (!name || !password || !fullName || !email) {
        alert('Παρακαλώ γεμίστε όλα τα πεδία.');
        return;
    }
    // Call addUserToLocalStorage function with the gathered details
    addUserToLocalStorage(name, password, fullName, email);

    alert('Δημιουργήθηκε ο λογαριασμός σας.');
    window.location.href = 'editprofile.html';
}