
const total = document.querySelector(".total-value");
const tip = document.querySelector(".tip-value");
const percentCustom = document.querySelector(".percent-custom");
const warnTxt = document.querySelector(".warn-text");
const activeSession = document.querySelector(".reset");

let bill = document.querySelector(".bill-value");
let customTip = document.querySelector(".custom-tip");
let buttons = document.querySelectorAll(".percent");
let user = document.querySelector(".user-value");

let prevChosen = [0];
let tipCalc;
let tipChosen = 0;
let result
let value = [5,10,15,25,50];


buttons.forEach((btn) => 
        
    btn.addEventListener("click", function() {
        
        buttons.forEach((btns) => 
            btns.classList.remove("active")
        )

        if(this.classList.contains(percentCustom)){
            this.classList.add("active");
        }else{   
            this.classList.add("active");
            if(btn.value > 0 || btn.value == null){
                prevChosen.push(btn.value);
                InputData(btn.value);
            }
        }
    })
)
//// calculate bill total divide by number of people ////

bill.addEventListener("input", InputData)

user.addEventListener("input", InputData)

customTip.addEventListener("input", InputData);


function InputData(tips) {

    if(user.value > 0 && bill.value > 0 || user.value === null){
        warnTxt.style.display = "none";
        activeSession.classList.remove("inactive");
        isChange(tips, bill.value, user.value);
        
    } else{
        activeSession.classList.add("inactive");
        total.innerHTML = "$0.00";
        tip.innerHTML = "$0.00";
        warnTxt.style.display = "block";
    }

}


function isChange(tips, bill, usr) {

    if(!isNaN(tips) && !prevChosen[prevChosen.length - 1] === tips) {
        prevChosen.push(tips);
    
    } else if(isNaN(tips) && customTip.value >= 0 && !customTip.value == ""){
        prevChosen.push(parseFloat(customTip.value));
    } else if(customTip.value == ""){
        if(buttons[5].classList.contains("active")){
            prevChosen.push(0);
        }

    } 
    
    if(bill == null && usr == null){
        tip.innerHTML ="$0.00";  
        return;
    }
    tipCalc = ((bill / 100) * prevChosen[prevChosen.length - 1]) / usr;
    CalcDiv(bill, usr, tipCalc);

    tip.innerHTML ="$" + tipCalc.toFixed(2);  
}



function CalcDiv(bill, user, tip) {
    
    result = (bill / user);
    tipChosen = parseFloat(tip) + parseFloat(result);
    total.innerHTML ="$" + tipChosen.toFixed(2);

}
/// RESET BUTTON FUCTIONALITY ///

activeSession.addEventListener("click", function() {
    buttons.forEach((btn) =>{
        btn.classList.remove("active");
    })
    prevChosen = [0];
    bill.value = "";
    customTip.value = "";
    user.value = "";
    tip.innerHTML ="$0.00";  
    total.innerHTML ="$0.00";  
    activeSession.classList.add("inactive");
})
