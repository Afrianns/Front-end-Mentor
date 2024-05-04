let accordTitles = document.querySelectorAll("ul li h2");
let accordDescs = document.querySelectorAll(".inside-wrapper");
let indicators = document.querySelectorAll("span");

accordTitles.forEach((accordTitle, iteration) => {
  accordTitle.addEventListener("click", () => {
    hideAllDesc(iteration);
    indicators[iteration].classList.toggle("minus");
    accordDescs[iteration].classList.toggle("close-gap");
  });
});

function hideAllDesc(current) {
  accordDescs.forEach((accordDesc, iteration) => {
    if (accordDesc.classList.contains("close-gap") && current != iteration) {
      console.log("check " + iteration);
      accordDesc.classList.remove("close-gap");
      indicators[iteration].classList.remove("minus");
    }
  });
}
