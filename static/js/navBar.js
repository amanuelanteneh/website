const hamMenu = document.getElementsByClassName("ham-menu")[0];
const navButtons = document.getElementsByClassName("navButtons")[0];
hamMenu.addEventListener('click', () => { 
    navButtons.classList.toggle('active');
});

//to make menu collapse once an option is picked after its been expanded on mobile
$("li").on("click", function() {
    console.log("html =" + $(this).attr("id") );
    if ($(this).attr("id") != "personal" && $(this).attr("id") != "pdfs" && $(this).attr("id") != "cv/github" && $(this).attr("class") == "navBar-li" ) {
        navButtons.classList.toggle('active');
    }
});