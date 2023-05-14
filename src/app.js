const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app=express()

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath) //make views path to point to the link we provide
hbs.registerPartials(partialsPath)

//Setup static directori to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Santiago Leonardis'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        descripcion:'Robot',
        name:'Santiago Leonardis'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        descripcion:'Whats your question',
        name:'Santiago Leonardis'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{city,longitude,latitude}={})=>{

        if (error){
            return res.send({error})
        }

        forecast (city,(error, forecastData)=>{
            if (error){
                return res.send({error})
            }
            
            res.send({

                forecast:forecastData,
                city,
                longitude,
                latitude,
                address:req.query.address
            })
        })

    })
})

app.get('/products',(req,res)=>{

    if (!req.query.search){
        return res.send({
            error:"You must provide search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404Error',{
        title:' Error 404 ',
        descripcion:'Help page not found'
    })
})
app.get('*',(req,res)=>{

    res.render('404Error',{
        title:' Error 404 ',
        descripcion:'Page not found',
        name:'Santiago Leonardis'
    })

})

app.listen(3000,()=>{
    console.log('Server is up in port 3000')
})