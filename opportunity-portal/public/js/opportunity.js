checkDate = require('./dateCheck')
moment = require('moment')

exports.opportunity =  function () {

    class Opp{
        constructor(id, oppName, deadlineDay, deadlineMonth, deadlineYear) {

            this.id = id;
            this.oppName = oppName;
            this.deadlineDay = deadlineDay;
            this.deadlineMonth = deadlineMonth;
            this.deadlineYear = deadlineYear;
            this.deadline

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

            this.deadline = moment([this.deadlineYear, this.deadlineMonth-1, this.deadlineDay])

            console.log("in opportunity: " + this.deadline.format("MM-DD-YYYY"))
            this.expired = checkDate.dateCheck(this.deadline.format())
            console.log("expiration date: " + this.expired)

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


    let s = new Opp(12, 'STEM Opp', 22, 11, 2020)

    return s
}