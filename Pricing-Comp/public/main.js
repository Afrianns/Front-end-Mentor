const btn = document.querySelector(".toggle");
const btn_sw = document.querySelector(".button");
const val =document.querySelectorAll(".price");

let Annually = ["199.99","249.99","399.99"];
let Monthly = ["19.99","24.99","39.99"];

btn.addEventListener("click", function(){
    if(btn_sw.classList.contains("btn-slide")){
        btn_sw.classList.remove("btn-slide");
        for (let i = 0; i < val.length; i++) {
            val[i].textContent = Annually[i];
        }
    } else{
        btn_sw.classList.add("btn-slide");
        for (let i = 0; i < val.length; i++) {
            val[i].textContent = Monthly[i];
        }
    }
})

