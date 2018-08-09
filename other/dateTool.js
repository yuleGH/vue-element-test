//设置转换方法
Date.prototype.pattern = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "\u65e5",
        "1" : "\u4e00",
        "2" : "\u4e8c",
        "3" : "\u4e09",
        "4" : "\u56db",
        "5" : "\u4e94",
        "6" : "\u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};


DateFormart = {
    YEAR : "yyyy",
    YEAR_MONTH_HORIZONTAL : "yyyy-MM",
    DATE_HORIZONTAL : "yyyy-MM-dd",
    DATETIME_HORIZONTAL_12 : "yyyy-MM-dd hh:mm:ss",
    DATETIME_HORIZONTAL_24 : "yyyy-MM-dd HH:mm:ss",
    YEAR_MONTH_SLASH : "yyyy/MM",
    DATE_SLASH : "yyyy/MM/dd",
    DATETIME_SLASH_8 : 'yyyyMMdd',
    DATETIME_SLASHL_12 : "yyyy/MM/dd hh:mm:ss",
    DATETIME_SLASH_24 : "yyyy/MM/dd HH:mm:ss"
};

var dateToolsFun = {
    /**
     * js的Date类型转换成formart格式的字符串, 支持的格式见DateFormart
     * 调用的方式例如：
     * var date = new Date();
     * var str = dateToString(date,DateFormart.DATETIME_HORIZONTAL_24);
     * @param datetime js中的Date对象
     * @param formart 转换成的字符串格式，支持的格式有参考DateFormart
     * */
    dateToString : function(date,formart){
        if(!formart){
            formart = DateFormart.DATE_HORIZONTAL;
        }
        var f = "" + formart;  //如果不加这个，pattern方法识别不了。
        var str = date.pattern(f);
        return str;
    },

    /**
     * AddDayCount天后的日期 （2016-09-27）
     * getDateStr(0) 今天
     * getDateStr(1) 明天
     * getDateStr(-1) 昨天
     */
    getDateStr : function(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;//获取当前月份的日期
        m = (m < 10 ? "0" + m : m);
        var d = dd.getDate();
        d = (d < 10 ? "0" + d : d);
        return y + "-" + m + "-" + d;
    },

    /**
     * 获取指定时间n天前/后的时间
     * baseDate 用于计算的时间
     * count 间隔的天数 （2016-09-27）
     * getDateStr(10) 10天后的日期
     * getDateStr(-10) 10天前的日期
     */
    getDateIntervalDay : function(baseDate,count) {
        var baseTime = baseDate.getTime();//1970 年 1 月 1 日至今的毫秒数
        var diff = 0;//毫秒数
        diff = count * 24 * 60 * 60 * 1000;//天转换成毫秒
        var resTime = baseTime + diff;
        var resDate = new Date(resTime);
        return resDate;
    },

    /**
     * 计算天数差的函数，通用    日期格式  年-月-日
     * String sDate1
     * String sDate2
     * 返回int型
     */
    getDateDiffDays : function(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式
        var  aDate,  oDate1,  oDate2,  iDays;
        aDate  =  sDate1.split("-");
        oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);    //转换为12-18-2002格式
        aDate  =  sDate2.split("-");
        oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);
        iDays  =  parseInt((oDate1  -  oDate2)  /  1000  /  60  /  60  /24);   //把相差的毫秒数转换为天数
        return  iDays;
    },
    /**
     * 计算天数差的函数，通用    日期格式  年-月-日 时:分
     * String sDate1
     * String sDate2
     * 返回double型
     */
    getDateDiffDaysForMinute : function(startTime,  endTime){    //sDate1和sDate2是2002-12-18 05:20格式
      var startTime =new Date(startTime.replace("//-/g", "//"));
      var endTime = new Date(endTime.replace("//-/g", "//"));

      return (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60 / 24;
    },

    /**
     * 获取当前月的月初 天
     * @return {string}
     */
    getCurrentBeginDay : function(){
        return dateToolsFun.getMonthBeginDay();
    },
    /**
     * 获取当前月的月末 天
     */
    getCurrentEndDay : function(){
        return dateToolsFun.getMonthEndDay();
    },

    /**
     * 获取某月的 月初 天
     * @param date
     * @return {string}
     */
    getMonthBeginDay : function(date){
        var dd = new Date(date);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;//获取date的日期
        return y + "-" + m + "-01";
    },
    /**
     * 获取某月的 月末 天
     * @param date
     * @return {string}
     */
    getMonthEndDay : function(date){
        var lastBeginDay = dateToolsFun.addMonth(dateToolsFun.getMonthBeginDay(date), 1);//下月月初
        return dateToolsFun.dateToString(dateToolsFun.getDateIntervalDay(new Date(lastBeginDay), -1), DateFormart.DATE_HORIZONTAL);
    },

    /**
     * 判断闰年
     * @param Year
     * @returns {boolean}
     */
    isLeapYear : function(Year) {
        if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
            return (true);
        } else { return (false); }
    },

    /**
     * 求自然月日期
     * @param date 原日期(Date类型)
     * @param monthCount 需要加的月数，负数为减
     * @param day 原日期是几号
     * @returns 计算月份之后的日期
     */
    getMonthBeforeFormatAndDay: function(date, monthCount, day) {
        date.setMonth(Number(date.getMonth()) + (monthCount * 1), 1);
        //读取日期自动会减一，所以要加一
        var mo = date.getMonth() + 1;
        //小月
        if (mo == 4 || mo == 6 || mo == 9 || mo == 11) {
            if (day > 30) {
                day = 30
            }
        }
        //2月
        else if (mo == 2) {
            if (dateToolsFun.isLeapYear(date.getFullYear())) {
                if (day > 29) {
                    day = 29
                } else {
                    day = 28
                }
            } else if (day > 28) {
                day = 28
            }
        }
        //大月
        else {
            if (day > 31) {
                day = 31
            }
        }
        date.setDate(day);
        return date;
    },

    /**
     * 指定日期字符串加月数
     * baseDate 用于计算的时间字符串（2016-01-01）
     * monthCount 需要加的月数，负数为减
     */
    addMonth : function (dateStr, monthCount) {
        var date = new Date(dateStr);
        var newDate = dateToolsFun.getMonthBeforeFormatAndDay(date,monthCount,Number(date.getDate()));
        return dateToolsFun.dateToString(newDate, "yyyy-MM-dd");
    }

};
