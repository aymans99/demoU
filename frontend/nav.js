const checkBtn = document.querySelector(".checkbtn");
const hamburgerIcon = document.getElementById("hamburgerIcon");
const closeIcon = document.getElementById("closeIcon");

checkBtn.addEventListener("click", function () {
  if (hamburgerIcon.style.display === "none") {
    hamburgerIcon.style.display = "block";
    closeIcon.style.display = "none";
    hamburgerIcon.classList.remove("animate-hamburger");
  } else {
    hamburgerIcon.style.display = "none";
    closeIcon.style.display = "block";
    hamburgerIcon.classList.add("animate-hamburger");
  }
});
