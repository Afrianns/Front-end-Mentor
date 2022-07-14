const btn = document.querySelector(".button");
const sw = document.querySelector(".switch");
let body = document.getElementsByTagName("body")[0];
let h_txt = document.getElementsByTagName("h1");
let p_txt = document.getElementsByTagName("p");
let card = document.querySelectorAll(".dm");
const attr = document.querySelector(".attribution");

btn.addEventListener("click", function (e) {
	btn.classList.toggle("mov");
	btn.classList.toggle("sw-dm");
	sw.classList.add("sw-bg");
	body.classList.toggle("d-mode");

	if (!btn.classList.contains("mov")) {
		sw.classList.remove("sw-bg");
	}
	for (let i = 0; i < card.length; i++) {
		card[i].classList.toggle("d-mode-card");
	}

	for (let s = 0; s < h_txt.length; s++) {
		h_txt[s].classList.toggle("d-mode-txt");
	}

	for (let x = 0; x < p_txt.length; x++) {
		if (!p_txt[x].classList.contains("fluct")) {
			p_txt[x].classList.toggle("d-mode-txt");
		}
	}
});
