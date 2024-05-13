const navMobileMenu = document.querySelector(".mobile-menu");
const menuIcon = document.querySelector(".menu-icon");
const iconPath = menuIcon.querySelector(".icon-path");

function showMobileMenu() {
  navMobileMenu.classList.toggle("mobile-menu--open");
  menuIcon.classList.toggle("active");

  if (menuIcon.classList.contains("active")) {
    iconPath.setAttribute("d", "M12 4L4 12M4 4L12 12");
    menuIcon.classList.add("rotate-in");
    menuIcon.classList.remove("rotate-out");
  } else {
    iconPath.setAttribute(
      "d",
      "M2.66663 8H13.3333M2.66663 4H13.3333M2.66663 12H13.3333"
    );
    menuIcon.classList.add("rotate-out");
    menuIcon.classList.remove("rotate-in");
  }
}