if (sessionStorage.getItem("login") === null) {
    document.getElementById("name").innerHTML = "";
} else {
    user = JSON.parse(sessionStorage.getItem("login"));
    document.getElementById("name").innerHTML = user.fullName;    
}