

function formValid(){

    let getInput = document.querySelectorAll(".data");
    let data = document.querySelectorAll(".output");
    
    let val, i;

    let regexIfound = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    
    
    
    for (i = 0; i < getInput.length; i++) {
        
        if(getInput[i] == getInput[2]){

            
            val = regexIfound.test(String(getInput[2].value).toLowerCase());
            
            
            if(!val){

                getInput[i].classList.add("warn");
                data[i].style.display = "block";
            } 
            else{
                
                data[i].style.display = "none";
                getInput[i].classList.remove("warn");
            }
            
        }
        
        else if(getInput[i].value == "" || getInput[i].value == undefined){
            
            getInput[i].classList.add("warn");
            data[i].style.display = "block";
        }
        
        else{
            
            data[i].style.display = "none";
            getInput[i].classList.remove("warn");
        }
    }
        

}





