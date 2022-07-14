const hum = document.querySelector(".hum");
const list = document.querySelector(".list");

function show() {
	if (list.classList.contains("navigation")) {
		list.classList.remove("navigation");
	} else {
		list.classList.add("navigation");
	}
}
