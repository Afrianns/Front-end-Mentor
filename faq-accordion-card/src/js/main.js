
const links = document.querySelectorAll(".subtitle");
const links_display = document.querySelectorAll(".content");


links.forEach((link, s) => {
    link.addEventListener("click", () => {
        links.forEach((a,b) => {
            if(b != s) closeLinks(a,b)
        })
    
        link.classList.toggle("active-link")
        link.children[1].classList.toggle("rotate")
        links_display[s].classList.toggle("active")
    })
});

window.addEventListener("click", (e) => {
    if(e.target.nodeName == 'P' || e.target.nodeName == 'SPAN') return
    links.forEach((a,b) => {
        closeLinks(a,b)
    })
})


function closeLinks(a,b) {
    a.children[1].classList.remove("rotate")
    a.classList.remove("active-link")
    links_display[b].classList.remove("active")
}