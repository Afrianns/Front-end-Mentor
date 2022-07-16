
const btn = document.querySelectorAll(".group");
const menu = document.querySelectorAll(".show");
const imgDrop = document.querySelectorAll(".img-drop");
const dd = document.querySelector(".dropdown");
const button = document.querySelectorAll(".btn");
const Menu = document.querySelectorAll(".menu");
const click = document.querySelectorAll(".click");


function drop(n) {

    menu[n].classList.toggle("hidden");
    imgDrop[n].classList.toggle("rotate-180");
    

    window.onclick = function(e){
            
        if(!e.target.matches(".drops")){
            for (let i = 0; i < menu.length; i++) {
                menu[i].classList.add("hidden");
                imgDrop[i].classList.remove("rotate-180");
                
            }
        }
    }   
    
}




button.forEach((s) => {
    s.addEventListener("click", () => {
        // Menu.forEach((c) =>{
            Menu[0].classList.toggle("translate-x-full")
        
        // e.classList.toggle("hidden")
        // })

        // Menu[1].style.display = "block"
        Menu[1].classList.toggle("hidden")
        Menu[1].classList.toggle("bg-opacity-80 hidden")
    })
})