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
let out="";
for(let i=0;i<10;i++){
out += Rand.Int(0, 9);
}
return out;
}

}



//querySelector

const INITIAL=async()=>{



const numberContainer = document.querySelector(".numberContainer");

const genNumBtn=document.querySelector('.genNumBtn');



const getRandomNumberElementChild=()=>{

const randomNumber = Rand.RandomPhoneNumber();

const numEln= document.createElement("span");
numEln.innerHTML = `
	
	<i class="addNumberBtn fa fa-2x fa-whatsapp">add</i>
	
	<span class="number wa">${randomNumber}</span>
`;

numEln.classList.add("huntNumber");

return numEln;
}



// generate random phone number and appending at parent container
const generateNumber=()=>{
numberContainer.innerHTML="";
let maxNumber=5;
for(let i=0;i<maxNumber;i++){
const chlid = getRandomNumberElementChild();
numberContainer.appendChild(chlid);
}
}

//calling first time for onces
generateNumber()




//saving number from clipboard
const saveNumber = (number)=>{
let save = `wa.me/91${number}`;
navigator.clipboard.writeText(save);
}


// number redirect to browser to wa
const redirectNumber = (number)=>{
let redirect = `https://wa.me/91${number}`;
window.location.assign(redirect);
}





// copying number  clipboard
const getNumber = (e)=>{

const element = e?.srcElement;

const condition = element.classList[0];

if(condition === "huntNumber"){
const textNumber = element.lastElementChild.innerText;
saveNumber(textNumber);
redirectNumber(textNumber);
}
else if(condition === "addNumberBtn"){
const textNumber = element.nextElementSibling.innerText;
saveNumber(textNumber);
redirectNumber(textNumber);
}
else if (condition === "number"){
const textNumber = element.innerText;
saveNumber(textNumber);
redirectNumber(textNumber);
}
else{
console.log("something wrong");
}




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


