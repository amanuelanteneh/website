const hamMenu = document.getElementsByClassName("ham-menu")[0];
const navButtons = document.getElementsByClassName("navButtons")[0];
hamMenu.addEventListener('click', () => { 
    navButtons.classList.toggle('active');
});

$("li").on("click", function() {
    console.log("html =" + $(this).attr("id") );
    if ($(this).attr("id") != "personal") {
        navButtons.classList.toggle('active');
    }
});