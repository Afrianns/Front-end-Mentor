const current = document.querySelectorAll(".current-time");
const previous = document.querySelectorAll(".previous-time");
const btns = document.querySelectorAll(".btns");


fetch('./public/js/data.json').then(response => {
return response.json();
}).then(data => {
    Adding(data);
    ActiveSes(btn = "Weekly", data);
    btns[1].classList.add("active");
}).catch(err => {
    console.log(err);
});



  function Adding(data) {

    for (let i = 0; i < btns.length; i++) {
        let curr;
        btns[i].addEventListener("click", function() {
            curr = document.querySelectorAll(".active");
            if(curr.length > 0){
                curr[0].classList.remove("active");
            }
            btns[i].classList.add("active");
            ActiveSes(btns[i].textContent, data );
        })
    }
        
  }


function ActiveSes(btn , data) {

    for (let i = 0; i < data.length; i++) {
        
        switch (btn) {
            case "Daily":
            current[i].textContent = data[i].timeframes.daily.current + "hrs";
            previous[i].textContent =data[i].timeframes.daily.previous;   
            break;
        case "Monthly":
            current[i].textContent = data[i].timeframes.monthly.current + "hrs";
            previous[i].textContent =data[i].timeframes.monthly.previous;
            break;
        case "Weekly":
            current[i].textContent = data[i].timeframes.weekly.current + "hrs";
            previous[i].textContent =data[i].timeframes.weekly.previous; 
            break;
        default:  
            current[i].textContent = 0 + "hrs";
            previous[i].textContent = 0; 
            break;


        }  
        
    }
}
