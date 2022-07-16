
const display = document.querySelectorAll(".show");
const imgDrop = document.querySelectorAll(".img-drop");
const button = document.querySelectorAll(".btn");
const Menu = document.querySelectorAll(".menu");


function drop(n) {

    display[n].classList.toggle("hidden");
    imgDrop[n].classList.toggle("rotate-180");
    

    window.onclick = function(e){
            
        if(!e.target.matches(".drops")){
            for (let i = 0; i < display.length; i++) {
                display[i].classList.add("hidden");
                imgDrop[i].classList.remove("rotate-180");
                
            }
        }
    }   
    
}


button.forEach((s) => {
    s.addEventListener("click", () => {
        Menu[0].classList.toggle("translate-x-full")

        Menu[1].classList.toggle("hidden")
        Menu[1].classList.toggle("opacity-80")
    })
})