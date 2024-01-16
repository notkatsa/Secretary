var loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', check);
function check(event) {
    event.preventDefault();

    var storedData = JSON.parse(localStorage.getItem('users'));

    var userName = document.getElementById('userName').value;
    var userPw = document.getElementById('userPass').value;

    // Check if entered data matches stored data
    var validUser = storedData.some(function(user) {
        if(user.name === userName && user.pw === userPw) {
            sessionStorage.setItem('login', JSON.stringify(user))
            return 1

        }else {
            return 0
        }
    });

    if (validUser) {
        alert("logged in.");
        window.location.href = "info.html";
    } else {
        alert("ERROR");
    }

}
