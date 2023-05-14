const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

messageOne.textContent='Loading...'
messageTwo.textContent=' '

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value

    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)+'').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
        if (data.error){

            messageTwo.textContent=data.error
            console.log(data.error)
        }else{
            messageTwo.textContent=data.forecast
            console.log(data.forecast)
        }
    })
})
})