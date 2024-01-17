
if (sessionStorage.getItem('login') !== null) {
    user = JSON.parse(sessionStorage.getItem('login'));
    amElement = document.getElementById("ΑΜ");
    amElement.value = user.sdi;

    names_list = user.fullName.split(" ");
    document.getElementById("first_name").value = names_list[0];
    document.getElementById("last_name").value = names_list[1];
    document.getElementById("email").value = user.email;
}