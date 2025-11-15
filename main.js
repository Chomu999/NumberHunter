"use strict";

//some utils
class Rand{

static Float(min=0, max=1){
return Math.random() * (max - min+1) + min;
}

static Int(min=6, max=9){
return Math.floor( Rand.Float(min, max));
}

static Choice(...args){
return args[Rand.Int(0, args.length - 1)];
}

static Color(len=3){
let outColor="#";
for(let i=0;i<len;++i){
outColor+=Rand.Choice(..."0123456789abcdef".split(""));
}
return outColor;
}


static RandomPhoneNumber(){
let firstNum = document.querySelector(".firstNum").value??"9";

let out=firstNum;
for(let i=0;i<9;i++){
out+=(Rand.Int(0, 9) );
}
return out;
}

}




const getRandomNumberElementChild=()=>{

const randomNumber = Rand.RandomPhoneNumber();
const _S= document.createElement("span");


_S.innerHTML = `
	<i class="add_whatsapp_Btn fa fa-solid fa-1x fa-whatsapp"></i>
	
	<span class="number wa">${randomNumber}</span>
	
	<i class="add_telegram_Btn fa fa-solid fa-1x fa-telegram"></i>
`;

_S.classList.add("huntNumber");
_S.classList.add("aniA");

return _S;
}





//sleep function helps to hold up workflow
const sleep=async (t=1) => new Promise( res => setTimeout( () => res(true), t*1000) );




//saving number from clipboard
const saveNumber = (number)=>{
let save = `+91${number}`;
navigator.clipboard.writeText(save);
}


// number redirect to browser to wa
const redirectNumber = (number, type=true)=>{
let platform = (type===true)?"wa.me":"t.me";
let redirect = `https://${platform}/91${number}`;
window.location.assign(redirect);
}





//querySelector

const INITIAL=async()=>{


const numberContainer = document.querySelector(".numberContainer");

const genNumBtn=document.querySelector('.genNumBtn');
const genMaxNum=document.querySelector('.genMaxNum');




// generate random phone number and appending at parent container
const generateNumber= async()=>{



for(let i=numberContainer.childElementCount; i>0;i--){

const prevSpan = numberContainer.querySelector(`span.huntNumber:last-child`);
prevSpan.classList.add("number-out")
await sleep(0.3);
prevSpan.remove();
}



let maxNumber=parseInt(genMaxNum.value)||1;

for(let i=0;i<maxNumber;i++){
const chlid = getRandomNumberElementChild();
numberContainer.append(chlid);
await sleep(0.25);
chlid.classList.remove("aniA");
}

}

generateNumber();


//console.log([numberContainer])




// copying number  clipboard
const getNumber = (e)=>{

const element = e?.srcElement;

const condition = element.classList[0];


if(condition === "huntNumber"){
element.classList.toggle("aniB");
element.onanimationend = () =>{
element.classList.toggle("aniB");
}
return false;
}


else if(condition === "add_whatsapp_Btn"){
const textNumber = element.nextElementSibling.innerText;
element.parentElement.classList.toggle("aniB");
element.parentElement.onanimationend = () =>{
element.parentElement.classList.toggle("aniB");
}
saveNumber(textNumber);
redirectNumber(textNumber, true);
}

else if (condition === "number"){
const textNumber = element.innerText;
element.parentElement.classList.toggle("aniB");
element.parentElement.onanimationend = () =>{
element.parentElement.classList.toggle("aniB");
}
saveNumber(textNumber);
}

else if(condition === "add_telegram_Btn"){
const textNumber = element.previousElementSibling.innerText;
element.parentElement.classList.toggle("aniB");
element.parentElement.onanimationend = () =>{
element.parentElement.classList.toggle("aniB");
}
saveNumber(textNumber);
redirectNumber(textNumber, false);
}

else return false;


}






//control

numberContainer.addEventListener("click", getNumber);



genNumBtn.addEventListener("click", generateNumber);







}




window.addEventListener("load", ()=>{

try{
console.log("JavaScript is Awesome ");
INITIAL();
}catch(err){
console.log(`javascript uncatch error: ${err} `);
}

});

