const startButton = document.getElementById('start-btn');
const multiButton=document.getElementById('multi-btn');
const nextButton=document.getElementById('next-btn');
const resultButton=document.getElementById('result-btn');
const skipButton=document.getElementById('skip-btn');
const fiftyButton=document.getElementById('fifty-btn');
const questionContainer = document.getElementById('question-container');
const questions=document.getElementById('question');
const resultDisplay=document.getElementById('scoreContainer');
const answerButton=document.getElementById('answer-buttons');
const progressDisplay=document.getElementById('progress');
const progressDisplay2=document.getElementById('progress2');
////timer
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const timerDiv=document.getElementById('timer');
let TimeCount=15;
let TIMER;
const questionTime=15;
const gaugeWidth=150;
const gaugeUnit=gaugeWidth/questionTime;
//
let questionData,currentQuestion,score,score2,player;
startButton.addEventListener('click',startGame);
multiButton.addEventListener('click',startGame);
nextButton.addEventListener('click',()=>{
  TimeCount=15;
  currentQuestion++;
  setNextQuestion();
});
resultButton.addEventListener('click',resultPage);
skipButton.addEventListener('click',skipQuestion);
fiftyButton.addEventListener('click',fiftyFifty); 

function startGame(e){
	loadJSON(function(response) {
  questionData=JSON.parse(response).sort(()=>Math.random()-.5); //shuffled questions
    currentQuestion=0;
    if(e.target.id=='start-btn'){
    player=1;
    score=0;
    }else{
      player=2;
      score=0;
      score2=0;
    }

    startButton.classList.add('invisible');
    multiButton.classList.add('hide');
    //reset skip button
    skipButton.classList.remove('hide');
    skipButton.dataset.used=false;
    skipButton.dataset.used2=false;
    //reset fifty button
    fiftyButton.classList.remove('hide');
    fiftyButton.dataset.used=false;
    fiftyButton.dataset.used2=false;
    questionContainer.classList.remove('hide');
    answerTrogress();
    showTimer();
    
    resetScore();
    setNextQuestion();
  });
  
}

function setNextQuestion(){
  if(player==1){
    if(skipButton.dataset.used=='false'){
      console.log('skip button 1 player debug');
      skipButton.classList.remove('hide');
    }
    if(fiftyButton.dataset.used=='false'){
      fiftyButton.classList.remove('hide');
    }
  }else{
    if(currentQuestion%2==0){
      if(skipButton.dataset.used=='false'){
        skipButton.classList.remove('hide');
      }
      if(fiftyButton.dataset.used=='false'){
        fiftyButton.classList.remove('hide');
      }
    }else{
      if(skipButton.dataset.used2=='false'){
        skipButton.classList.remove('hide');
      }
      if(fiftyButton.dataset.used2=='false'){
        fiftyButton.classList.remove('hide');
      }
    }
  }
  resetState()
  showQuestion();
}

function showQuestion(){
  TimeCount=15;
  TIMER=setInterval(showTimer,1000); 
  questions.innerText=questionData[currentQuestion].question;
  question.style.fontSize = "x-large";
  let tempAanswerArray=[];
  questionData[currentQuestion].incorrect.forEach(element => {
    tempAanswerArray.push({text:element,correct:false});
  });
  tempAanswerArray.push({text:questionData[currentQuestion].correct,correct:true});
  tempAanswerArray.sort(()=>Math.random()-.5);
  let i=0;
  tempAanswerArray.forEach(answer=>{
    const button=document.createElement('button');
    button.innerText=answer.text;
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.classList.add('btn-lg');
    button.id=`answer${i}`
    i++;
    button.style.fontSize = "large";
    if(answer.correct){
      button.dataset.correct=answer.correct;
    }
    button.addEventListener('click',selectAnswer);
    answerButton.appendChild(button);
  });
}

function showTimer(){
  timerDiv.classList.remove('hide');
  if(TimeCount>=0){
    counter.innerHTML=TimeCount;
    timeGauge.style.width=TimeCount*gaugeUnit+"px";
    TimeCount--;
  }else{
    showJudgePage(false);
  }
}

function resetState(){
  nextButton.classList.add('hide')
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
}

function resetScore(){
  resultDisplay.classList.add('hide')
  while(resultDisplay.firstChild){
    resultDisplay.removeChild(resultDisplay.firstChild);
  }
}

function selectAnswer(e){
  const selectButton=e.target;
  const correct=selectButton.dataset.correct;
  showJudgePage(correct);

}

function showJudgePage(judge){
  clearInterval(TIMER);
  if(!skipButton.classList.contains('hide')){
    skipButton.classList.add('hide');
  }
  if(!fiftyButton.classList.contains('hide')){
    fiftyButton.classList.add('hide');
  }
  let tempProcess=document.getElementById(currentQuestion);
  if(judge){
    tempProcess.classList.add('correct');
    if(player==2){
      if(currentQuestion%2==0){
      score++;
      }else{
        score2++;
      }    
    }else{
      score++;
    }
  }else{
    tempProcess.classList.add('wrong');
  }
  Array.from(answerButton.children).forEach(button=>{
    setStatusClass(button,button.dataset.correct);
    button.disabled=true;
  });
  if(currentQuestion<9){
    nextButton.classList.remove('hide');
  }else{
    resultButton.classList.remove('hide');
  }
 
}


function setStatusClass(element,correct){
  clearStatusClass(element);
  if(correct){
    element.classList.remove('btn-primary');
    element.classList.add('btn-success');
  }else{
    element.classList.remove('btn-primary');
    element.classList.add('btn-danger');
  }
}

function clearStatusClass(element){
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function answerTrogress(){
  while(progressDisplay.firstChild){
    progressDisplay.removeChild(progressDisplay.firstChild);
  }
  while(progressDisplay2.firstChild){
    progressDisplay2.removeChild(progressDisplay2.firstChild);
  }
  if(player==1){
    for(let i=0;i<10;i++){
      let process=document.createElement("div");
      process.classList.add('prog');
      process.id=i;
      progressDisplay.appendChild(process);
    }
  }else{
    for(let i=0;i<10;i++){
      let process=document.createElement("div");
      process.classList.add('prog');
      process.id=i;
      if(i%2==0){
      progressDisplay.appendChild(process);
    }else{
      progressDisplay2.appendChild(process);
    }
  }
}
}

function skipQuestion(){
  clearInterval(TIMER);
  if(player==1){
    skipButton.dataset.used=true;
  }else{
    if(currentQuestion%2==0){
      skipButton.dataset.used=true;
    }else{
      skipButton.dataset.used2=true;
    }
  }
  skipButton.classList.add('hide');
  questionData.splice(currentQuestion, 1);
  //skipButton.classList.add()
  setNextQuestion();
}

function fiftyFifty(){
  if(player==1){
  fiftyButton.dataset.used=true;
  }else{
    if(currentQuestion%2==0){
      fiftyButton.dataset.used=true;
    }else{
      fiftyButton.dataset.used2=true;
    }
  }
  fiftyButton.classList.add('hide');
  let count=answerButton.childNodes.length;
  let index=0;
  while(count>=3){
    if(!answerButton.childNodes[index].dataset.correct){
      answerButton.childNodes[index].classList.add('invisible');
      count--;
    }
    index++
  }
}


function resultPage(){
  resultButton.classList.add('hide');
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
  if(player==1){
  questions.innerHTML='<h3>You score is</h3>';
  let h = document.createElement("H1");
  let t = document.createTextNode(score+"0%");
  h.appendChild(t);
  h.classList.add('result');
  resultDisplay.appendChild(h);
  }else{
    questions.innerHTML='<h3>The match result:</h3>';
    let h = document.createElement("H1");
    let t = document.createTextNode("Player 1:"+score+"0%");
    h.appendChild(t);
    h.classList.add('result');
    resultDisplay.appendChild(h);
    let h2 = document.createElement("H1");
    let t2 = document.createTextNode("Player 2:"+score2+"0%");
    h2.appendChild(t2);
    h2.classList.add('result');
    resultDisplay.appendChild(h2);
  }
  resultDisplay.classList.remove('hide');
  startButton.innerText='Restart 1 player';
  startButton.classList.remove('invisible');
  multiButton.innerText='Restart 2 players';
  multiButton.classList.remove('hide');

}


function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'Apprentice_TandemFor400_Data.json', true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {

            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

