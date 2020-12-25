const hamMenu = document.getElementsByClassName("ham-menu")[0]
const navButtons = document.getElementsByClassName("navButtons")[0] 
hamMenu.addEventListener('click', () => { 
    navButtons.classList.toggle('active')
})