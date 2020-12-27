var quote1 = 'The philosophers have only interpreted the world, in various ways. The point, however, is to change it.'
var quote2 = 'We are more free than ever before. We have the advantage of feeling an immense space around us but also an immense void.' 
var quote3 = 'We learn history not in order to know how to behave or how to succeed, but to know who we are.'
var quote4 = 'As the archaeology of our thought easily shows, man is an invention of recent date. And one perhaps nearing its end.'
var quotes = [quote1, quote2, quote3, quote4];

$(document).ready(function () {
    $("#floatingQuote").click(function () {
        $("#floatingQuote").fadeOut(function () {
            $("#floatingQuote").text( quotes[Math.floor((Math.random() * 4))]).fadeIn();
        })
    })
});