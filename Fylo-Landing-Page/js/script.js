const btn = document.querySelectorAll(".sign-up");
const email = document.querySelectorAll(".email");
const warn = document.querySelector(".alert");
const warn_two = document.querySelector(".alert-second");


for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
    
    let mail = String(email[i].value);   
        let result = validate(mail);
        if (result) {
            if(i == 0){
                warn.style.display ="none";
            } else{
                warn_two.style.display ="none";
            }
        } else {
            if(i == 0){
                warn.style.display ="block";
            } else{
                warn_two.style.display ="block";
            }
        }
    })

}


const validate = (mail) => {
    return mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
}