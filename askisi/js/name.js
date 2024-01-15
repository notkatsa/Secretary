if (sessionStorage.getItem("login") === null) {
    document.getElementById("name").innerHTML = "Hello Stranger. Login for more Function.";
} else {
    user = JSON.parse(sessionStorage.getItem("login"));
    document.getElementById("name").innerHTML = user.fullName;
}