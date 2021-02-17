const hamMenu = document.getElementsByClassName("ham-menu")[0];
const navButtons = document.getElementsByClassName("navButtons")[0];
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");
hamMenu.addEventListener('click', () => { 
   /* bar1.style.visibility = "hidden" ;
    bar2.style.transform = "rotate(" + -70 + "deg)";
    bar3.style.transform = "rotate(" + 70 + "deg)";    */
    navButtons.classList.toggle('active');
});

//to make menu collapse once an option is picked after its been expanded on mobile
$("li").on("click", function() {

    if ($(this).attr("id") != "personal" && $(this).attr("id") != "pdfs" && $(this).attr("id") != "cv/github" && $(this).attr("class") == "navBar-li" ) {
        navButtons.classList.toggle('active');
    }
});