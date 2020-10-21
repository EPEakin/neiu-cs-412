const axios = require('axios')

exports.getActivity = function(){

    let result

    function addSpan(){
        console.log('I am in addSpan')
        const newSpan = document.createElement("span")
        newSpan.innerText = result
        let foo = document.querySelector("div")
        foo.appendChild(newSpan)
    }

    axios.get('https://www.boredapi.com/api/activity').then(response => {
        result = response.data.activity
        console.log(result)
        console.log('Data retrieved')
        addSpan()

    }).catch(err =>{
        console.error('Error: ', err);
    })




}

