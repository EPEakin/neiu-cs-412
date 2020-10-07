
exports.dateCheck = function (deadline, emitter) {
    let today = moment()
    let deadline1 = moment(deadline)

    emitter.on('foo', function (arg1, arg2) {
        console.log(`Hooray! I have received ${arg1} ${arg2}`)
    })

    console.log("from moment: " + today.format("MM DD YYYY") + "\n deadline1: " + deadline1.format("MM DD YYYY"))

    let days = deadline1.diff(today, 'days')

    if ( days > 0 ) {
        console.log(`The deadline is ${days} days away!`)
        return true;
    }
    else if(days === 0)
    {
        console.log(`The application is due today!`)
        return true;
    }
    else{
        console.log('The due date has passed!')
        return false;
    }


}