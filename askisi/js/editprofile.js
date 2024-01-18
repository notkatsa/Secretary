// editprofile.js

document.addEventListener("DOMContentLoaded", function () {
  // Fetch user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const users = JSON.parse(localStorage.getItem("users"));
  const currentUserId = "sdi2100001"; // You can dynamically get this based on the logged-in user

  // Find the user's data in the userInfo array
  const currentUserData = userInfo.find(user => user.sdi === currentUserId);

  // Find the user's data in the users array
  const currentUser = users.find(user => user.sdi === currentUserId);

  // Split fullName into firstName and lastName
  const [firstName, lastName] = currentUser.fullName.split(" ");

  // Populate form fields
  document.getElementById("firstName").value = firstName;
  document.getElementById("lastName").value = lastName;
  document.getElementById("id").value = currentUserId;
  document.getElementById("email").value = currentUser.email;

  // Check if the phone number, date, and address are not -1
  if (currentUserData.phoneNumber !== -1) {
    document.getElementById("phoneNumber").value = currentUserData.phoneNumber;
  }

  if (currentUserData.dateOfBirth !== -1) {
    document.getElementById("date").value = currentUserData.dateOfBirth;
  }

  if (currentUserData.address !== -1) {
    document.getElementById("address").value = currentUserData.address;
  }

  // Submit form event listener
  document.getElementById("editProfileForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Update user data in localStorage
    currentUser.email = document.getElementById("email").value;

    // Update userInfo data in localStorage
    currentUserData.email = document.getElementById("email").value;

    // Update phone number, date, and address if they are not -1
    currentUserData.phoneNumber = document.getElementById("phoneNumber").value !== "" ? document.getElementById("phoneNumber").value : -1;
    currentUserData.dateOfBirth = document.getElementById("date").value !== "" ? document.getElementById("date").value : -1;
    currentUserData.address = document.getElementById("address").value !== "" ? document.getElementById("address").value : -1;

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("users", JSON.stringify(users));

    alert("Profile updated successfully!");
  });
});
