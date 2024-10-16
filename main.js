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
let out=[];
for(let i=0;i<10;i++){
out.push(Rand.Int(0, 9) );
}
out[0]=(out[0]===0)?Rand.Int(0, 9):out[0];
out =out.join().split(",").join("");
return out;
}

}



//querySelector

const INITIAL=async()=>{



const numberContainer = document.querySelector(".numberContainer");

const genNumBtn=document.querySelector('.genNumBtn');
const genMaxNum=document.querySelector('.genMaxNum');



const getRandomNumberElementChild=()=>{

const randomNumber = Rand.RandomPhoneNumber();
const Element= document.createElement("span");


Element.innerHTML = `
	<i class="add_whatsapp_Btn fa fa-3x fa-whatsapp"></i>
	
	<span class="number wa">${randomNumber}</span>
	
	<i class="add_telegram_Btn fa fa-3x fa-telegram"></i>
`;

Element.classList.add("huntNumber");

return Element;
}



// generate random phone number and appending at parent container
const generateNumber=()=>{
numberContainer.innerHTML="";
let maxNumber=parseInt(genMaxNum.innerText)||1;
for(let i=0;i<maxNumber;i++){
const chlid = getRandomNumberElementChild();
numberContainer.appendChild(chlid);
}

}

//calling first time for onces
generateNumber();




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





// copying number  clipboard
const getNumber = (e)=>{

const element = e?.srcElement;

const condition = element.classList[0];

if(condition === "huntNumber") return false;

else if(condition === "add_whatsapp_Btn"){
const textNumber = element.nextElementSibling.innerText;
saveNumber(textNumber);
redirectNumber(textNumber, true);
}

else if (condition === "number"){
const textNumber = element.innerText;
saveNumber(textNumber);
}

else if(condition === "add_telegram_Btn"){
const textNumber = element.previousElementSibling.innerText;
saveNumber(textNumber);
redirectNumber(textNumber, false);
}

else return false;


}






numberContainer.addEventListener("click", getNumber);



genNumBtn.addEventListener("click", generateNumber);







}


try{

console.log("JavaScript is Awesome ");
INITIAL();

}catch(err){
console.log(`javascript uncatch error: ${err} `);
}


