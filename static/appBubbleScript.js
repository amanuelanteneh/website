function appBubbleFunction() {
    var clickCount = 0;
    $('#appBubble').click(function () { //fix because someone can span tf outta this and break it
        if (clickCount % 2 == 0) {
            $('#appBubble').animate({ height: '55vh' }) //extend height on even clicks
             clickCount++; //clickCount += 1
        }
        else {
            $('#appBubble').animate({ height: '5vh' }) //revert height to normal on odd num clicks
            clickCount++; //clickCount += 1
        }
    });
}
$(document).ready(appBubbleFunction);

