const inputElem=document.querySelector("input")
const searchElem=document.querySelector("#search")
const latitudeElem=document.querySelector(".latitudeElem")
const longitudeElem=document.querySelector(".longitudeElem")
const mainInfo=document.querySelector("h1")
const tempElem=document.querySelector(".tempElem")
const windSpeed=document.querySelector(".windSpeed")
const humidity=document.querySelector(".humidity")
const cloudCover=document.querySelector(".cloudCover")
const winddirDegree=document.querySelector(".winddirDegree")
const windDegreText=document.querySelector(".wind-degre--text")
const UVText=document.querySelector(".UV-text")

const searchFunc= async()=>{
    try{
        mainInfo.innerHTML="در حال جستجو برای شهر مورد نظر"
        let city=inputElem.value

    const dataWeather =await getdataInformation(city)
    showData(dataWeather)
    }catch{
        noutFound()
    }
}
const getdataInformation=async(city)=>{
    const data=await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1&lang=fa`)
    const result=await data.json()
    return result
    
}
const showData=(dataWeather)=>{
    // area
    const area= dataWeather.nearest_area[0]
    mainInfo.innerHTML=`شهر مورد نظر شما (${area.areaName[0].value}) در ناحیه (${area.region[0].value}) و درکشور (${area.country[0].value}) است`
    latitudeElem.innerHTML=`${area.latitude}`
    longitudeElem.innerHTML=`${area.longitude}`
    // area
    const tempAndOuther=dataWeather.current_condition[0]
    tempElem.innerHTML=`${tempAndOuther.temp_C}°C`
    windSpeed.innerHTML=`${tempAndOuther.windspeedKmph}km/h`
    humidity.innerHTML=`${tempAndOuther.humidity}%`
    cloudCover.innerHTML=`${tempAndOuther.cloudcover}%`
    winddirDegree.style.rotate=`${tempAndOuther.winddirDegree}deg`
    windDegreText.innerHTML=`${tempAndOuther.winddirDegree} درجه`
    UVText.innerHTML=`${tempAndOuther.uvIndex}`
    

}
const noutFound=()=>{
    mainInfo.innerHTML="شهر مورد نظر شما یافت نشد"
    latitudeElem.innerHTML=0
    longitudeElem.innerHTML=0
    tempElem.innerHTML=0
    windSpeed.innerHTML=0
    humidity.innerHTML=0
    cloudCover.innerHTML=0
    winddirDegree.style.rotate=0
    windDegreText.innerHTML=0
    UVText.innerHTML=0
}
window.addEventListener("keyup",(event)=>{

    if(event.key==="Enter"){
        searchFunc()
    }
})
searchElem.addEventListener("click",searchFunc)