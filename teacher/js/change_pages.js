document.getElementById("button-grades1").onclick = function () {
    location.href = "teachergrades.html"
}
document.getElementById("button-info1").onclick = function () {
    location.href = "teacherinfo.html"
}
document.querySelectorAll(".usericon")[0].addEventListener('click', editprof)

function editprof() {
    if (sessionStorage.getItem("login") === null)
    alert("You are not logged in.")
    else 
    location.href = "./editprofile.html"
}
if (sessionStorage.getItem("login") === null){
    // Replace usericon with a button
    const userIcons = document.getElementsByClassName('usericon');
    for (const userIcon of userIcons) {
        // Create HTML markup for the button
            userIcon.removeEventListener('click', editprof);            
            const buttonHTML = `
            <div onclick="location.href='login.html'">
                Login
            </div>
        `;

        // Set the innerHTML of userIcon to the button HTML
        userIcon.innerHTML = buttonHTML;
    }
}