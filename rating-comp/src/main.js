const rates = document.querySelectorAll('[data-list]')
const result = document.querySelector(".result .rating")
const submit = document.querySelector(".submit")
const inputRate = document.querySelector(".input-rating")
const resultRate = document.querySelector(".result-rating")
const warn = document.querySelector(".warning")

let dataset = 0;

rates.forEach((rate,i) =>{
    rate.addEventListener("click", () => {  

        rates.forEach(i =>{
            i.classList.remove('active')
        })
        
        rate.classList.add("active")

        dataset  = rates[i].dataset.list
    })
})


submit.addEventListener("click", () => {
        
    if (dataset == 0) return warn.classList.remove("none")

    inputRate.classList.add("none")
    resultRate.classList.remove("none")
    result.textContent = dataset
})




