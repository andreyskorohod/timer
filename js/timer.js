$(document).ready(function () {
    var time = $('div.timer span');
    var result = $('div.results');
    var count = 1;
    var interval = 0;
    localStorage.clear()

    $('#start').on('click',function () {
        if (!(time.hasClass('active'))){
            startStopwatch();
            time.addClass('active');
            $('#start').text('stop')
        } else {
            pauseStopwatch()
            showResults(count);
            count++;
            time.removeClass('active');
            $('#start').text('start')
        }
    });

    $('#split').on('click',function () {
        if (time.hasClass('active')){
            showResults(count);
            count++;
        }
    });

    $('#reset').on('click',function () {
        resetStopwatch();
        result.html('');
        count = 1;
        time.removeClass('active');
    });

    function startStopwatch(){
        clearInterval(interval);

        var startTimestamp = new Date().getTime(),
            runningTime = 0;

        localStorage.stopwatchBeginingTimestamp = startTimestamp;
        if(Number(localStorage.stopwatchRunningTime)){
            runningTime = Number(localStorage.stopwatchRunningTime);
        }
        else{
            localStorage.stopwatchRunningTime = 1;
        }
        interval = setInterval(function () {
            var stopwatchTime = (new Date().getTime() - startTimestamp + runningTime);

            time.text(formattedTime(stopwatchTime));
        }, 1);
    };

    function pauseStopwatch(){

        clearInterval(interval);

        if(Number(localStorage.stopwatchBeginingTimestamp)){
            var runningTime = Number(localStorage.stopwatchRunningTime) + new Date().getTime() - Number(localStorage.stopwatchBeginingTimestamp);
            localStorage.stopwatchBeginingTimestamp = 0;
            localStorage.stopwatchRunningTime = runningTime;
        }
    };

    function resetStopwatch(){
        clearInterval(interval);
        time.text(formattedTime(0));
        localStorage.clear()
    }
});

function formattedTime(time){
    var milliseconds = Math.floor(time % 1000),
        seconds = Math.floor((time/1000) % 60),
        minutes = Math.floor((time/(1000*60)) % 60),
        hours = Math.floor((time/(1000*60*60)) % 24);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    if (milliseconds < 100) {
        if (milliseconds >= 10) milliseconds = '0' + milliseconds;
        else milliseconds = '0' + '0' + milliseconds;
    }
    if (hours < 10) hours = "0" + hours;
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function showResults(count) {
    var time = $('div.timer span');
    var result = $('div.results');
    var newResult = count.toString() + ' Stop: ' + time.text() + '<br>';

    result.append(newResult);
};