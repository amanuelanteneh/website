//script is actually for main page (index) 
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

$(window).on('load', function() { //check width when page loads to see if u should use bootstrap dropdown class or nah
    if($(window).width() < 940) {
        document.getElementById("pdfs menu").classList.add('dropdown');
        document.getElementById("pdfs menu").classList.remove('menu');
        document.getElementById("personal menu").classList.add('dropdown');
        document.getElementById("personal menu").classList.remove('menu');
        document.getElementById("cv-github menu").classList.add('dropdown');
        document.getElementById("cv-github menu").classList.remove('menu');        
    }
})

$(window).on('resize', function() { //same but for if window is resized
    if($(window).width() < 940) {
        document.getElementById("pdfs menu").classList.add('dropdown');
        document.getElementById("pdfs menu").classList.remove('menu');
        document.getElementById("personal menu").classList.add('dropdown');
        document.getElementById("personal menu").classList.remove('menu');
        document.getElementById("cv-github menu").classList.add('dropdown');
        document.getElementById("cv-github menu").classList.remove('menu');        
    }
})

$(window).on('resize', function() { //ibid
    if($(window).width() > 940) {
        document.getElementById("pdfs menu").classList.remove('dropdown');
        document.getElementById("pdfs menu").classList.add('menu');
        document.getElementById("personal menu").classList.remove('dropdown');
        document.getElementById("personal menu").classList.add('menu');
        document.getElementById("cv-github menu").classList.remove('dropdown');
        document.getElementById("cv-github menu").classList.add('menu');        
    }
})
