document.addEventListener("DOMContentLoaded", function () {
  const menuBurger = document.querySelector(".menu_burger");
  const links = document.querySelector(".links");
  if (menuBurger) {
    menuBurger.addEventListener("click", function () {
      this.classList.toggle("active");
      links.classList.toggle("open");
      console.log("click");
    });
  }
});
