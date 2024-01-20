// autofill
if (sessionStorage.getItem('login') !== null) {
    var user = JSON.parse(sessionStorage.getItem('login'));
    var amElement = document.getElementById("ΑΜ");
    amElement.value = user.sdi;

    var names_list = user.fullName.split(" ");
    document.getElementById("first_name").value = names_list[0];
    document.getElementById("last_name").value = names_list[1];
    document.getElementById("email").value = user.email;
}

// submit form
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("sign-form");

    // on submit
    form.addEventListener("submit", (e) => {
        // check if all input fields are filled
        e.preventDefault(); // Prevent the default form submission

        var formIsValid= true;
        for (element of form.elements){
            if (element.value!==null) {
                continue;
            }
            else formIsValid=false;
        }
        
        var amElement = document.getElementById("ΑΜ");
        if (amElement.value !== user.sdi) {
            alert("Διαφορετικά AM");
            return;
        }

        if (formIsValid) {
            alert("Έγινε Αίτηση Πιστοποιητικού!");
            // Additional actions after successful submission
            sec_list = JSON.parse(localStorage.getItem("sec"));  
            studentObject = sec_list.find(student => student.sdi === user.sdi)
            if (studentObject) {
                var typeElement = document.getElementById("certificateType");
                studentObject.reqs.push({value: typeElement.value, date: (new Date().toISOString())});
                localStorage.setItem("sec", JSON.stringify(sec_list));
            }
        } else {
            alert("Παρακαλώ συμπληρώστε όλα τα στοιχεία.");
        }

    })
})