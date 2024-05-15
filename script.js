const playbutton=document.getElementById("play-button");
const pausebutton=document.getElementById("pause-button");
const stopbutton=document.getElementById("stop-button");
const textInput=document.getElementById("text");
const speedInput=document.getElementById("speed");


playbutton.addEventListener('click',()=>{
    playText(textInput.value);
})

function playText(text){
    if(speechSynthesis.paused && speechSynthesis.speaking){
        return speechSynthesis.resume();   // this line check if the speech is paused and there is some remaining text for speaking so don't start speaking from the start instead resume it from where it left off to do this return is used so that it will finish the text to the end
    }
    if(speechSynthesis.speaking) return ;
    utterance.text=text;
    utterance.rate=speedInput.value || 1;  //means speed input speed or default value is 1

    textInput.disabled=true; // this line stop the user to interact with the textinput  ,user will not able to write in the textarea at the time of speaking
    speechSynthesis.speak(utterance);
}

pausebutton.addEventListener('click',pauseText);

function pauseText(){
    if(speechSynthesis.speaking){
        speechSynthesis.pause();
    }
}

stopbutton.addEventListener('click',stopText);

function stopText(){
    speechSynthesis.resume(); // this will take the speech out of pause state and then stop it 
    speechSynthesis.cancel(); // this will stop the speech
} 

//Here we are dealing with the speed , we want to increase or decrease the speed in between the speaking
let currCharacter;
speedInput.addEventListener("input", () => {
  stopText();
  playText(utterance.tex.substring(currCharacter)); // we are increasing or decreasing from the current character while speaking
});

const utterance=new SpeechSynthesisUtterance(); // it is a api for text to speech
   utterance.addEventListener("end", () => {
     textInput.disabled = false; // this line give access again to write in the text area only if all the text is completely speaked
   });

   
    utterance.addEventListener("boundary", e => {
      currCharacter=e.charIndex;
    });
