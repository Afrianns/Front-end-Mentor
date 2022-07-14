const progress = document.querySelector(".progressBG");
const slide = document.querySelector(".slide");
const slidr = document.querySelector(".slider");
const sw = document.querySelector(".switch");
const sw_btn = document.querySelector(".switch-button");
const discount = document.querySelector(".discount");
const mprice = document.querySelector(".month-price");
const visitor = document.querySelector(".visitors");
let wdthS = window.matchMedia("(min-width: 600px)");
let wdthT = window.matchMedia("(max-width: 300px)");
let slideValue;


// month billing array
const pricesValueMT = ["$5.00","$12.00", "$15.99","$21.99", "$29.99","$32.00","$39.99", "$46.99","$51.99", "$62.99","$70.99"]
const visitsValueMT = ["6K","13K","22K","30K","41K","51K","79K","88K","90K", "105K", "135K"]

//year billing array
const pricesValueYR = ["$15.00","$22.00", "$28.99","$34.99", "$49.99","$62.00","$79.99", "$96.99","$100.99", "$122.99","$130.99"]
const visitsValueYR = ["21K","35K","49K","60K", "71K","83K","110K","133K","151K", "165K", "175K"]

wdthS.addEventListener("change", ()=> {
    
    if(wdthS.matches) {     
        discount.innerHTML = "25% discount";
    }else if(wdthT.matches) {     
        discount.innerHTML = "25% discount";
    } else {
        discount.innerHTML = "-25%";
    }
});


sw.addEventListener("click",() =>{
    slideValue = slidr.value / 10;
    if(sw_btn.classList.contains("sw-toggle-button")){
        sw_btn.classList.remove("sw-toggle-button");
        mprice.innerHTML = pricesValueMT[slideValue]
        visitor.innerHTML = visitsValueMT[slideValue]
    } else{
        sw_btn.classList.add("sw-toggle-button");
        mprice.innerHTML = pricesValueYR[slideValue];
        visitor.innerHTML = visitsValueYR[slideValue];
    }
})


slidr.oninput = function(){
    slideValue = slidr.value / 10;
    if(sw_btn.classList.contains("sw-toggle-button")){
        visitor.innerHTML = visitsValueYR[slideValue];
        mprice.innerHTML = pricesValueYR[slideValue];
    } else{
        visitor.innerHTML = visitsValueMT[slideValue];
        mprice.innerHTML = pricesValueMT[slideValue];
    }

    progress.style.width = slidr.value + "%";
    slide.style.left = (slidr.value / 1.08) + "%";   
}

window.addEventListener("input", () => {
    if(screen.width <= 600){
        slide.style.left = (slidr.value / 1.15) + "%";
    }
})
