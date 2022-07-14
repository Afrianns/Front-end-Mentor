
const toggle = document.querySelector("#dropdown");
const menu = document.querySelector(".dropdown-menu");
const nav = document.querySelector(".content");

toggle.addEventListener("click", function(){
    menu.classList.toggle("nav");
    if(menu.classList.contains("nav")){
        toggle.style.backgroundImage = "url('../images/icon-close.svg')";
    } else{
        toggle.style.backgroundImage = "url('../images/icon-hamburger.svg')";
    }
})
