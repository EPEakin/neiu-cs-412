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