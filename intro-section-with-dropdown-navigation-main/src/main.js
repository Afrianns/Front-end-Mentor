
const btn = document.querySelectorAll(".group");
const menu = document.querySelectorAll(".show");
const imgDrop = document.querySelectorAll(".img-drop");
const dd = document.querySelector(".dropdown");
const button = document.querySelectorAll(".btn");
const slideMenu = document.querySelector(".menu");


function drop(n) {

    btn.forEach(d => {

        d.children[0].children[0].classList.remove("rotate-180");
        d.children[1].classList.add("hidden");

    })
    imgDrop[n].classList.add("rotate-180");
    menu[n].classList.remove("hidden");


    window.onclick = function(e){

        if(!e.target.matches(".drops")){
            menu[n].classList.add("hidden");
            imgDrop[n].classList.remove("rotate-180");
        }
    }
}

button.forEach((s) => {
    s.addEventListener("click", e => {
        slideMenu.classList.toggle("hidden")
        
    })
})
