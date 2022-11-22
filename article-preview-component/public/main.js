const share = document.querySelector(".share");
const fshare = document.querySelector(".fa-share");
const shareMenu = document.querySelector(".share-menu");
const shareIcon = document.querySelector(".share-icon");

// console.log(share.children[0]);

share.addEventListener('click', () => {
    shareMenu.classList.toggle("show");
    share.classList.toggle("share-icon");
    fshare.classList.toggle("share-icon-color");
})