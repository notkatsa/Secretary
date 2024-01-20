document.getElementById("button-grades").onclick = function () {
    location.href = "./grades.html"
}
document.getElementById("button-info").onclick = function () {
    location.href = "./info.html"
}
document.getElementById("button-courses").onclick = function () {
    location.href = "./courses.html"
}
document.getElementById("button-dilosi").onclick = function () {
    location.href = "./dilosi.html"
}
document.getElementById("button-sec").onclick = function () {
    location.href = "./secretary.html"
}
document.getElementById("button-history").onclick = function () {
    location.href = "./history.html"
}

function editprof() {      
        if (sessionStorage.getItem("login") === null)
            alert("You are not logged in.")
        else 
        location.href = "./editprofile.html"
}
document.querySelectorAll(".usericon")[0].addEventListener('click',editprof)

window.onload = () => {
    if (sessionStorage.getItem("login") === null){
        // Replace usericon with a button
        const userIcons = document.getElementsByClassName('usericon');

        // Loop through elements with the usericon class
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
}