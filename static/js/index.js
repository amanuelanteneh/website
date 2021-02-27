const hamMenu = document.getElementsByClassName("ham-menu")[0];
var navButtons = document.getElementsByClassName("navButtons")[0];

var interests = document.getElementById("interests");
var interestsMenu = document.getElementById("interests-menu");
var interestsArrow = document.getElementById("interests-arrow");

var pdfs = document.getElementById("pdfs");
var pdfsMenu = document.getElementById("pdfs-menu");
var pdfsArrow = document.getElementById("pdfs-arrow");

var cvGithub = document.getElementById("cv-github");
var cvGithubMenu = document.getElementById("cv-github-menu");
var cvGithubArrow = document.getElementById("cv-github-arrow");

var bar1 = document.getElementById("bar1");
var bar2 = document.getElementById("bar2");
var bar3 = document.getElementById("bar3");
bar1.style.transition = "transform 0.2s linear";
bar3.style.transition = "transform 0.2s linear";  
navButtons.style.transition = "transform 0.2s linear";

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
        interestsMenu.style.display = "none";
        pdfsMenu.style.display = "none";        
        cvGithubMenu.style.display = "none"; 
        navButtons.classList.toggle('active');
    }
    hamMenuOpen = !hamMenuOpen;
});

interests.addEventListener('click', () => { //to control visibility of dropdown items on mobile
    if ($(window).width() >= 940) {
        return;
    }
    if (interestsMenu.style.display == "none") {
        interestsMenu.style.display = "block";
        cvGithubMenu.style.display = "none";
        pdfsMenu.style.display = "none";
    }
    else {
        interestsMenu.style.display = "none";
        cvGithubMenu.style.display = "none";
        pdfsMenu.style.display = "none";
    }
});

pdfs.addEventListener('click', () => {
    if ($(window).width() >= 940) {
        return;
    }
    if (pdfsMenu.style.display == "none") {
        pdfsMenu.style.display = "block";
        cvGithubMenu.style.display = "none";
        interestsMenu.style.display = "none";
    }
    else {
        interestsMenu.style.display = "none";
        cvGithubMenu.style.display = "none";
        pdfsMenu.style.display = "none";
    }
});

cvGithub.addEventListener('click', () => { 
    if ($(window).width() >= 940) {
        return;
    }
    if (cvGithubMenu.style.display == "none") {
        pdfsMenu.style.display = "none";
        cvGithubMenu.style.display = "block";
        interestsMenu.style.display = "none";
    }
    else {
        interestsMenu.style.display = "none";
        cvGithubMenu.style.display = "none";
        pdfsMenu.style.display = "none";
    }
});

//to make menu collapse once an option is picked after its been expanded on mobile
$("li").on("click", function() {
    if ($(window).width() >= 940) {
        return; // only run func if window size is for mobile, else hover stops working when clicking navbar items bc of lines 110-112
    }
    if ($(this).attr("id") != "interests" && $(this).attr("id") != "pdfs" && $(this).attr("id") != "cv-github" && $(this).attr("class") == "navBar-li" ) {
        if (!hamMenuOpen) {    //hamburger menu squish animation
        bar1.style.transform = "translateY(" + "9px" + ")";
        bar3.style.transform = "translateY(" + "-9px" + ")"; 
        navButtons.classList.toggle('active');
            }
        else {
        bar1.style.transform = "translateY(" + "-0.5px" + ")";
        bar3.style.transform = "translateY(" + "0.5px" + ")"; 
        navButtons.classList.toggle('active');   
        interestsMenu.style.display = "none";
        pdfsMenu.style.display = "none";        
        cvGithubMenu.style.display = "none"; 
        }
    hamMenuOpen = !hamMenuOpen;
    
    }
});

$(window).on('load', function() { //check width when page loads to see if u should use bootstrap dropdown class or nah
    if($(window).width() <= 940) {
        document.getElementById("pdfs-menu").classList.add('dropdown');
        document.getElementById("pdfs-menu").classList.remove('menu');
        document.getElementById("interests-menu").classList.add('dropdown');
        document.getElementById("interests-menu").classList.remove('menu');
        document.getElementById("cv-github-menu").classList.add('dropdown');
        document.getElementById("cv-github-menu").classList.remove('menu');        
    }
})

$(window).on('resize', function() { //same but for if window is resized
    if($(window).width() <= 940) {
        document.getElementById("pdfs-menu").classList.add('dropdown');
        document.getElementById("pdfs-menu").classList.remove('menu');
        document.getElementById("interests-menu").classList.add('dropdown');
        document.getElementById("interests-menu").classList.remove('menu');
        document.getElementById("cv-github-menu").classList.add('dropdown');
        document.getElementById("cv-github-menu").classList.remove('menu');        
    }
    else {
        document.getElementById("pdfs-menu").classList.add('menu');
        document.getElementById("pdfs-menu").classList.remove('dropdown');
        document.getElementById("interests-menu").classList.add('menu');
        document.getElementById("interests-menu").classList.remove('dropdown');
        document.getElementById("cv-github-menu").classList.add('menu');    
        document.getElementById("cv-github-menu").classList.remove('dropdown');
    }
});
