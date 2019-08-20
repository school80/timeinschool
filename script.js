let dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp)
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
                d.constructor === Array ? new Date(d[0],d[1],d[2]) :
                    d.constructor === Number ? new Date(d) :
                        d.constructor === String ? new Date(d) :
                            typeof d === "object" ? new Date(d.year,d.month,d.date) :
                                NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
                (a>b)-(a<b) :
                NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
                start <= d && d <= end :
                NaN
        );
    }
};

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

function newDates(){
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
}

function start() {
    timer.pause();
    let now = new Date();

    for(let i=0; i<13; i++){
        console.log('test');
        if (dates.inRange(now, lessons[i], lessons[i+1])) {
            console.log(i);
            let between = lessons[i+1] - now;
            let minutes = Math.trunc(between/60/1000);
            let seconds = Math.trunc((between/1000)%60);

            timer([0,minutes,seconds], function(h,m,s){
                if (i % 2 == 0){
                    root.innerHTML = 'До конца урока осталось: ' + m + ':' + s;
                } else {
                    root.innerHTML = 'До начала урока осталось: ' + m + ':' + s;
                }
            });

            timer.pause();
            timer.start();

            setTimeout(() => start(), between);
        }
    }
    if (now >= lessons[13] || now <= lessons[0]){
        root.innerHTML = 'Уроки закончились';
        newDates();
        setTimeout(() => start(), 1000);
    }
}

newDates();
start();
