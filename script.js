function timer(_time, _call){
    timer.lastCall = _call;
    timer.lastTime = _time;
    timer.timerInterval = setInterval(function(){
        _call(_time[0],_time[1],_time[2]);
        _time[2]--
        if(_time[0]==0 && _time[1]==0 && _time[2]==0){
            timer.pause()
            _call(0,0,0);
        }
        if(_time[2]==0){
            _time[2] = 59
            _time[1]--
            if(_time[1]==0){
                _time[1] = 59
                _time[0]--
            }
        }
        timer.lastTime = _time
    }, 1000)
}

timer.pause = function(){
    clearInterval(timer.timerInterval)
};

timer.start = function(){
    timer(timer.lastTime, timer.lastCall)
}

let root = document.getElementById('root');
let lessons = [];

for (let i=0; i<=13; i++){
    lessons[i] = new Date();
}

lessons[0].setHours(9,0,0);
lessons[2].setHours(9,55,0);
lessons[4].setHours(11,0,0);
lessons[6].setHours(12,5,0);
lessons[8].setHours(13,10,0);
lessons[10].setHours(14,5,0);
lessons[12].setHours(15,0,0);

lessons[1].setHours(9,45,0);
lessons[3].setHours(10,40,0);
lessons[5].setHours(11,45,0);
lessons[7].setHours(12,50,0);
lessons[9].setHours(13,55,0);
lessons[11].setHours(14,50,0);
lessons[13].setHours(15,45,0);

let today = new Date();
today.setHours(9,0,0);

function isStart(){
    console.log('test');
    if ((new Date() <= today) || (new Date() >= lessons[13])){
        root.innerHTML = 'Уроки закончились';
        console.log('today: ', today);
        console.log('new Date:', new Date());
        setTimeout(() => isStart(),1000);
    } else {
        startDay();
    }
}

function startDay() {
    console.log('testt');
    //1 urok
    timer([0,44,59],
        function (h,m,s) {
            root.innerHTML = 'До конца урока осталось: ' + m + ':' + s;
        })
    timer.pause();
    timer.start();

    //1 peremena
    setTimeout(function(){
        timer.pause();
        timer([0,9,59],
            function (h,m,s) {
                root.innerHTML = 'До начала урока осталось: ' + m + ':' + s;
            })
        timer.pause();
        timer.start();
    },lessons[1]-lessons[0]);

    //2 urok
    setTimeout(function(){
        timer.pause();
        timer([0,44,59],
            function (h,m,s) {
                root.innerHTML = 'До конца урока осталось: ' + m + ':' + s;
            })
        timer.pause();
        timer.start();
    },lessons[2]-lessons[0]);

    //2 peremena
    setTimeout(function(){
        timer.pause();
        timer([0,19,59],
            function (h,m,s) {
                root.innerHTML = 'До начала урока осталось: ' + m + ':' + s;
            })
        timer.pause();
        timer.start();
    },lessons[3]-lessons[0]);

    //3 urok
    setTimeout(function(){
        timer.pause();
        timer([0,44,59],
            function (h,m,s) {
                root.innerHTML = 'До конца урока осталось: ' + m + ':' + s;
            })
        timer.pause();
        timer.start();
    },lessons[4]-lessons[0]);

    //3 peremena
    setTimeout(function(){
        timer.pause();
        timer([0,19,59],
            function (h,m,s) {
                root.innerHTML = 'До начала урока осталось: ' + m + ':' + s;
            })
        timer.pause();
        timer.start();
    },lessons[5]-lessons[0]);

    //4 urok
    setTimeout(function(){
        timer.pause();
        timer([0,44,59],
            function (h,m,s) {
                root.innerHTML = 'До конца урока осталось: ' + m + ':' + s;
            })
        timer.pause();
        timer.start();
    },lessons[6]-lessons[0]);

    //4 peremena
    setTimeout(function(){
        timer.pause();
        timer([0,19,59],
            function (h,m,s) {
                root.innerHTML = 'До начала урока осталось: ' + m + ':' + s;
            })
        timer.pause();
        timer.start();
    },lessons[7]-lessons[0]);

    //5 urok
    setTimeout(function(){
        timer.pause();
        timer([0,44,59],
            function (h,m,s) {
                root.innerHTML = 'До конца урока осталось: ' + m + ':' + s;
            })
        timer.pause();
        timer.start();
    },lessons[8]-lessons[0]);

    //5 peremena
    setTimeout(function(){
        timer.pause();
        timer([0,9,59],
            function (h,m,s) {
                root.innerHTML = 'До начала урока осталось: ' + m + ':' + s;
            })
        timer.pause();
        timer.start();
    },lessons[9]-lessons[0]);

    //6 urok
    setTimeout(function(){
        timer.pause();
        timer([0,44,59],
            function (h,m,s) {
                root.innerHTML = 'До конца урока осталось: ' + m + ':' + s;
            })
        timer.pause();
        timer.start();
    },lessons[10]-lessons[0]);

    //6 peremena
    setTimeout(function(){
        timer.pause();
        timer([0,9,59],
            function (h,m,s) {
                root.innerHTML = 'До начала урока осталось: ' + m + ':' + s;
            })
        timer.pause();
        timer.start();
    },lessons[11]-lessons[0]);

    //7 urok
    setTimeout(function(){
        timer.pause();
        timer([0,44,59],
            function (h,m,s) {
                root.innerHTML = 'До конца урока осталось: ' + m + ':' + s;
            })
        timer.pause();
        timer.start();
    },lessons[12]-lessons[0]);

    setTimeout(function(){
        timer.pause();
        isStart();
    },lessons[13]-lessons[0]);
}


isStart();
