const startButton = document.getElementById('start-btn');
const nextButton=document.getElementById('next-btn');
const resultButton=document.getElementById('result-btn');
const skipButton=document.getElementById('skip-btn');
const fiftyButton=document.getElementById('fifty-btn');
const questionContainer = document.getElementById('question-container');
const questions=document.getElementById('question');
const resultDisplay=document.getElementById('scoreContainer');
const answerButton=document.getElementById('answer-buttons');
const progressDisplay=document.getElementById('progress');
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
let questionData,currentQuestion,score;
startButton.addEventListener('click',startGame);
nextButton.addEventListener('click',()=>{
  TimeCount=15;
  currentQuestion++;
  setNextQuestion();
});
resultButton.addEventListener('click',resultPage);
skipButton.addEventListener('click',skipQuestion);
fiftyButton.addEventListener('click',fiftyFifty);

function startGame(){
	loadJSON(function(response) {
  questionData=JSON.parse(response).sort(()=>Math.random()-.5); //shuffled questions
    currentQuestion=0;
    score=0;

    startButton.classList.add('invisible');
    skipButton.classList.remove('hide');
    fiftyButton.classList.remove('hide');
    questionContainer.classList.remove('hide');
    answerTrogress();
    showTimer();
    
    resetScore();
    setNextQuestion();
  });
  
}

function setNextQuestion(){
  if(!skipButton.dataset.used){
    skipButton.classList.remove('hide');
  }
  if(!fiftyButton.dataset.used){
    fiftyButton.classList.remove('hide');
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
    score++;    
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
  for(let i=0;i<10;i++){
    let process=document.createElement("div");
    process.classList.add('prog');
    process.id=i;
    progressDisplay.appendChild(process);
  }
}

function skipQuestion(){
  clearInterval(TIMER);
  skipButton.dataset.used=true;
  skipButton.classList.add('hide');
  questionData.splice(currentQuestion, 1);
  skipButton.classList.add()
  setNextQuestion();
}

function fiftyFifty(){
  fiftyButton.dataset.used=true;
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
  questions.innerHTML='<h3>You score is</h3>';
  let h = document.createElement("H1");
  let t = document.createTextNode(score+"0%");
  h.appendChild(t);
  h.classList.add('result');
  resultDisplay.appendChild(h);
  resultDisplay.classList.remove('hide');
  startButton.innerText='Restart';
  startButton.classList.remove('invisible');
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

