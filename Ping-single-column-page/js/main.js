const button = document.querySelector(".btn");
const warn = document.querySelector(".warn");

function isEmail(){    
    const inputVal = document.getElementById("Val");
    
    let input = inputVal.value
    
    const valid = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    let data = valid.test(input);
    
    if(!data){
        warn.classList.add("info");
        inputVal.classList.add("val");
        warn.innerHTML ="Please provide a valid email address";
    
    }else{
        warn.classList.remove("info");
        inputVal.classList.remove("val");
        warn.innerHTML ="";
    }
}