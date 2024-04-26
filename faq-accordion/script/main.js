let accordTitles = document.querySelectorAll("ul li h2");
let accordDescs = document.querySelectorAll("ul li p");
let indicators = document.querySelectorAll("span");

accordTitles.forEach((accordTitle, iteration) => {
  accordTitle.addEventListener("click", () => {
    hideAllDesc(iteration);
    indicators[iteration].classList.toggle("minus");
    accordDescs[iteration].classList.toggle("hidden");
  });
});

function hideAllDesc(current) {
  accordDescs.forEach((accordDesc, iteration) => {
    if (!accordDesc.classList.contains("hidden") && current != iteration) {
      accordDesc.classList.add("hidden");
      indicators[iteration].classList.remove("minus");
    }
  });
}
