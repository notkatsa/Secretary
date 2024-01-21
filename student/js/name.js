if (sessionStorage.getItem("login") === null) {
    document.getElementById("name").innerHTML = "";
} else {
    user = JSON.parse(sessionStorage.getItem("login"));
    document.getElementById("name").innerHTML = user.fullName;    
}

function logout() {
    // Clear session storage
    if (sessionStorage.getItem("login") === null) {
        return;
    }
    alert("Αποσυνδεθήκατε.")
    sessionStorage.clear();

    // Clear local storage
    localStorage.clear();

    // Redirect to the logout page or perform any other logout actions
    window.location.href = "http://127.0.0.1:5501/index.html";
  }