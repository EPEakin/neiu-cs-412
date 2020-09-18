(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.oppCheck = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports.dateCheck = function (day, month, year) {
    console.log(day + " " + month + " " + year)
    let today = new Date()
    let deadline = new Date;
    deadline.setDate(day)
    deadline.setMonth(month-1)
    deadline.setFullYear(year)

    if ( today < deadline ) {
        return true;
    }
    else{
        console.log('The due date has passed!')
        return false;
    }


}
},{}],2:[function(require,module,exports){
opp = require('./opportunity')

exports.oppCheck =  function () {
    let foo = opp.opportunity()
    if(foo.expiredGet)
    {
        let deadline = new Date;
        deadline.setDate(foo.oppDayGet)
        deadline.setMonth(foo.oppMonthGet-1)
        deadline.setFullYear(foo.oppYearGet)
        console.log("The deadline for this opportunity is " + deadline.toDateString())
    }else
    {
        console.log("The deadline for this opportunity has passed.")
    }

    return 0
}




},{"./opportunity":3}],3:[function(require,module,exports){
checkDate = require('./dateCheck')

exports.opportunity =  function () {

    class Opp{
        constructor(id, oppName, deadlineDay, deadlineMonth, deadlineYear) {

            this.id = id;
            this.oppName = oppName;
            this.deadlineDay = deadlineDay;
            this.deadlineMonth = deadlineMonth;
            this.deadlineYear = deadlineYear;

            function checkType(value, type){
                if (!(typeof value === type)) {
                    throw new TypeError(`Must be a ${type}`);
                }
            }

            checkType(this.id, 'number');
            checkType(this.oppName, 'string');
            checkType(this.deadlineDay, 'number')
            checkType(this.deadlineMonth, 'number')
            checkType(this.deadlineYear, 'number')

            this.expired = checkDate.dateCheck(this.deadlineDay, this.deadlineMonth, this.deadlineYear)
            console.log(this.expired)

        }


        get idGet(){
            return this.id;
        }

        get oppNameGet(){
            return this.oppName;
        }

        get oppDayGet(){
            return this.deadlineDay;
        }

        get oppMonthGet(){
            return this.deadlineMonth;
        }

        get oppYearGet(){
            return this.deadlineYear;
        }

        get expiredGet(){
            return this.expired;
        }
    }


    let s = new Opp(12, 'STEM Opp', 21, 9, 2020)

    return s
}
},{"./dateCheck":1}]},{},[2])(2)
});
