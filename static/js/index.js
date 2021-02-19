//script is for main page (index) 
const hamMenu = document.getElementsByClassName("ham-menu")[0];
const navButtons = document.getElementsByClassName("navButtons")[0];
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");
bar1.style.transition = "transform 0.2s linear";
bar3.style.transition = "transform 0.2s linear";    
var hamMenuOpen = 0;
hamMenu.addEventListener('click', () => { 
    if (!hamMenuOpen) {    //hamburger menu squish animation
        bar1.style.transform = "translateY(" + "9px" + ")";
        bar3.style.transform = "translateY(" + "-9px" + ")"; 
        navButtons.classList.toggle('active');
    }
    else {
        bar1.style.transform = "translateY(" + "-0.5px" + ")";
        bar3.style.transform = "translateY(" + "0.5px" + ")"; 
        navButtons.classList.toggle('active');        
    }
    hamMenuOpen = !hamMenuOpen;
});

//to make menu collapse once an option is picked after its been expanded on mobile
$("li").on("click", function() {

    if ($(this).attr("id") != "interests" && $(this).attr("id") != "pdfs" && $(this).attr("id") != "cv/github" && $(this).attr("class") == "navBar-li" ) {
        navButtons.classList.toggle('active');
    }
});

$(window).on('load', function() { //check width when page loads to see if u should use bootstrap dropdown class or nah
    if($(window).width() < 940) {
        document.getElementById("pdfs menu").classList.add('dropdown');
        document.getElementById("pdfs menu").classList.remove('menu');
        document.getElementById("interests menu").classList.add('dropdown');
        document.getElementById("interests menu").classList.remove('menu');
        document.getElementById("cv-github menu").classList.add('dropdown');
        document.getElementById("cv-github menu").classList.remove('menu');        
    }
})

$(window).on('resize', function() { //same but for if window is resized
    if($(window).width() < 940) {
        document.getElementById("pdfs menu").classList.add('dropdown');
        document.getElementById("pdfs menu").classList.remove('menu');
        document.getElementById("interests menu").classList.add('dropdown');
        document.getElementById("interests menu").classList.remove('menu');
        document.getElementById("cv-github menu").classList.add('dropdown');
        document.getElementById("cv-github menu").classList.remove('menu');        
    }
})

$(window).on('resize', function() { //ibid but switch to no bootstrap class for big screens
    if($(window).width() > 940) {
        document.getElementById("pdfs menu").classList.remove('dropdown');
        document.getElementById("pdfs menu").classList.add('menu');
        document.getElementById("interests menu").classList.remove('dropdown');
        document.getElementById("interests menu").classList.add('menu');
        document.getElementById("cv-github menu").classList.remove('dropdown');
        document.getElementById("cv-github menu").classList.add('menu');        
    }
})
