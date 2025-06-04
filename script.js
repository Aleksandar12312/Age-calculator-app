
function wrongInput(errorLabel,errorMessage,emptyInput){
    errorLabel.style.color="red";
    errorMessage.style.visibility="visible";
    emptyInput.style.borderColor ="red";
}
function backToNormal(labelElement,message,input){
    labelElement.style.color="hsl(0, 1%, 44%)";
    message.style.visibility="hidden";
    input.style.borderColor="#ccc";
}
function calculation(inputDate){
    let currentDate =new Date();
    let year=currentDate.getFullYear()-inputDate.getFullYear();
    let month=currentDate.getMonth()-inputDate.getMonth()+1;
    let day=currentDate.getDate()-inputDate.getDate();
    if (day < 0) {
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        day += previousMonth.getDate();
        month -= 1;
    }
    if (month < 0) {
        month += 12;
        year -= 1;
    }
    return [ year, month, day] ;
}

const labelDay=document.getElementById("label-day");
const labelMonth=document.getElementById("label-month");
const labelYear=document.getElementById("label-year");

const inputDay=document.getElementById("input-day");
const inputMonth=document.getElementById("input-month");
const inputYear=document.getElementById("input-year");

const submitButton=document.querySelector(`input[type="submit"]`);

let errorDay=document.getElementById("error-day");
let errorMonth=document.getElementById("error-month");
let errorYear=document.getElementById("error-year");

let dayChanged=false;
let monthChanged=false;
let yearChanged=false;

submitButton.addEventListener("click",function(e){

    e.preventDefault();

    let monthNumb=inputMonth.value;
    let dayNumb=inputDay.value;
    let yearNumb=inputYear.value;


    //returning error changes back to normal
    if (monthChanged){
        backToNormal(labelMonth,errorMonth,inputMonth);
    }
    if(dayChanged){
        backToNormal(labelDay,errorDay,inputDay);
    }
    if(yearChanged){
        backToNormal(labelYear,errorYear,inputYear);
    }

    if (monthNumb.trim()===""){
        errorMonth.innerText="This field is required";
        wrongInput(labelMonth,errorMonth,inputMonth);
        monthChanged=true;
    }
    else if(isNaN(monthNumb)||monthNumb>12){
        errorMonth.innerText="Must be a valid month";
        wrongInput(labelMonth,errorMonth,inputMonth);
        monthChanged=true;
    }

    if (dayNumb.trim()===""){
        errorDay.innerText="This field is required";
        wrongInput(labelDay,errorDay,inputDay);
        dayChanged=true;
    }
   else if (isNaN(dayNumb)||!dayNumb <= new Date().getDate){
        errorDay.innerText="Must be a valid day";
        wrongInput(labelDay,errorDay,inputDay);
        dayChanged=true;
   }

    const currentDate=new Date();
   if (yearNumb.trim()===""){
       errorYear.innerText="This field i required";
       wrongInput(labelYear,errorYear,inputYear);
       yearChanged=true;
   }
    else if (isNaN(yearNumb)){
       errorYear.innerText="Must be a valid year";
       wrongInput(labelYear,errorYear,inputYear);
       yearChanged=true;
    }
    else if (yearNumb>currentDate.getFullYear()){
       errorYear.innerText="Must be in the past";
       wrongInput(labelYear,errorYear,inputYear);
       yearChanged=true;
   }
    else if (yearNumb==currentDate.getFullYear() && monthNumb>currentDate.getMonth()){
       errorYear.innerText="Must be in the past";
       wrongInput(labelYear,errorYear,inputYear);
       yearChanged=true;
   }
    let date=new Date();

    //everything is right
    if (!dayChanged&&!monthChanged&&!yearChanged){
        let outputYear=document.getElementById("output-year");
        let outputMonth=document.getElementById("output-month");
        let outputDay=document.getElementById("output-day");

        date.setFullYear(yearNumb,monthNumb,dayNumb);
        let numbers=calculation(date, new Date());

        outputYear.innerText=""+numbers[0];
        outputMonth.innerText=""+numbers[1];
        outputDay.innerText=""+numbers[2];
        backToNormal(labelYear,errorYear,inputYear);
        backToNormal(labelMonth,errorMonth,inputMonth);
        backToNormal(labelDay,errorDay,inputDay);
    }

     yearChanged=false;
    monthChanged=false;
    dayChanged=false;
});
