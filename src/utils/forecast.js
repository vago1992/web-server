const request=require("request")


const forecast=(address,callback)=>{
    const url='https://api.weatherapi.com/v1/current.json?key=99ad21a5684b45d497931952230505&q='+encodeURIComponent(address)+''
    request({url:url,json:true}, (error, {body})=>{

        if (error){
            console.log(error)

            callback("Unable to connect",undefined)
        }else if(body.location===undefined){

            callback("Unable to find location. Try another search",undefined)

        }else{
            callback(undefined, 'Is it currently in '+ body.location.name + " the humidity is  "+ body.current.humidity + " and the temperatur feels like " + body.current.feelslike_c )
        }

    })
}

module.exports= forecast 