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



