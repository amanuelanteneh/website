let quote1 = 'The philosophers have only <b><i>interpreted</i></b> the world, in various ways. The point, however, is to change it.<br> - <i>Theses on Feuerbach</i>'
let quote2 = 'We are more free than ever before to look around in all directions; nowhere do we perceive any limits. We have the advantage of feeling an immense space around us- <u>but also an immense void.</u><br> - <i>Introduction to Modernity</i>' 
let quote3 = 'We learn history not in order to know how to behave or how to succeed, <u>but to know who we are.</u><br> - <i>Modernity on Endless Trial</i>'
let quote4 = 'As the archaeology of our thought easily shows, man is an invention of recent date. And one perhaps <u>nearing its end</u>.<br> - <i>The Order of Things</i>'
let quotes = [quote1, quote2, quote3, quote4];
let index = 1;

$(document).ready(function () {
    $("#floatingQuote").click(function () {
        $("#floatingQuote").fadeOut(function () {
            $("#floatingQuote").html(quotes[index]).fadeIn();             
            if (index == 3) {
             index = 0;
            }
            else {
                index++;
            }
        })
    })
});