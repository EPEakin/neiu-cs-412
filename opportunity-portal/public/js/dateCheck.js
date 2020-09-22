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