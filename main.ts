import inquirer from "inquirer"

let validateDate=(input:string)=>{
    const datePattern=/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if(datePattern.test(input)){
        return true
    } else{
        return "please enter a valid date"
    }
}
let validateTime=(input:string)=>{
    const timePattern=/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/
    if(timePattern.test(input)){
        return true
    } else {
        return "please enter time in correct format"
    }
}
const date= await inquirer.prompt({
    type:"input",
    name:"date",
    message:"Enter Date",
    default:"(01/24/2023)",
    validate:validateDate
})

const time= await inquirer.prompt({
    type:"input",
    name:"time",
    message:"Enter time",
    default:"07:00 AM",
    validate:validateTime
})
let dates = new Date(date.date)

let splitted=time.time.split(" ")

let hours=Number(splitted[0].split(":")[0])
let minutes=Number(splitted[0].split(":")[1])

let ampm=splitted[1]

if(ampm == "PM" && hours !== 12){
    hours+=12
} else if(ampm == "AM" && hours == 12){
    hours = 0
}

dates.setHours(hours)
dates.setMinutes(minutes)

const calculateDifference=(dateFuture : number , dateNow : number):string=>{
    if (dateFuture > dateNow){
        let diffInMilliSeconds=Math.abs(dateFuture-dateNow)/1000;

        let days:number | string=Math.floor(diffInMilliSeconds/86400);
        diffInMilliSeconds -=days*86400;

        let hours:number| string=Math.floor(diffInMilliSeconds/3600)%24;
        diffInMilliSeconds -= hours*3600;
 
        let minutes:number | string = Math.floor(diffInMilliSeconds/60)% 60;
        diffInMilliSeconds -= minutes* 60

        let seconds: number | string = Math.floor(diffInMilliSeconds)%60
        

        if (days < 10){
            days =`0${days}`
        }else{
            days=`${days}`
        }
        
        if (hours < 10){
            hours =`0${hours}`
        }else{
            hours=`${hours}`
        }
        if(minutes < 10){
            minutes=`0${minutes}`
        }else{
            minutes=`${minutes}`
        }
        if (seconds < 9) {
            seconds = `0${Math.ceil(seconds)}`;
        } else {
            seconds = `${Math.ceil(seconds)}`;
        }
if (Number (days) > 0){
    return `${days}:${hours}:${minutes}:${seconds}`
}else if(Number(hours)> 0){
    return `${hours}:${minutes}:${seconds}`
}else{
    return `${minutes}:${seconds}`
}
    }else{
        return ""
    }
}
let interval= setInterval(()=>{
    let currentDate = new Date()
    let result=calculateDifference(dates.getTime(),currentDate.getTime())

    if (result===""){
        console.log("timer ended");
        clearInterval(interval)
    }else{
            process.stdout.write(`\r` +result)
        }
},1000)